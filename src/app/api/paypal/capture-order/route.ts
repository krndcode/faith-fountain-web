import { NextRequest, NextResponse } from "next/server";
import { captureOrderSchema } from "@/lib/validation/donation";
import { capturePayPalOrder, isPayPalConfigured } from "@/lib/paypal/server";
import { saveDonationToFirestore } from "@/lib/firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = captureOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid capture request",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { orderId } = validation.data;

    // In sandbox simulation mode (credentials not yet set in .env.local)
    if (!isPayPalConfigured() || orderId.startsWith("SANDBOX-MOCK-ORDER-")) {
      const mockResult = {
        orderId,
        captureId: `SIM-CAPTURE-${Date.now()}`,
        amount: body.amount || 50,
        currency: body.currency || "CAD",
        status: "COMPLETED" as const,
        donorEmail: body.donorEmail || "donor@example.com",
        donorName: body.donorName || "Kind Supporter",
      };

      await saveDonationToFirestore({
        paypalOrderId: mockResult.orderId,
        paypalCaptureId: mockResult.captureId,
        amount: mockResult.amount,
        currency: mockResult.currency,
        status: "COMPLETED",
        donorEmail: mockResult.donorEmail,
        donorName: mockResult.donorName,
      });

      return NextResponse.json({
        success: true,
        isSimulated: true,
        data: mockResult,
      });
    }

    // Live or real Sandbox capture via PayPal API
    const captureResult = await capturePayPalOrder(orderId);

    // Only record if successfully captured
    if (captureResult.status === "COMPLETED") {
      await saveDonationToFirestore({
        paypalOrderId: captureResult.orderId,
        paypalCaptureId: captureResult.captureId,
        amount: captureResult.amount,
        currency: captureResult.currency,
        status: captureResult.status,
        donorEmail: captureResult.donorEmail,
        donorName: captureResult.donorName,
      });
    }

    return NextResponse.json({
      success: true,
      data: captureResult,
    });
  } catch (error: any) {
    console.error("Error in capture-order endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Failed to capture payment" },
      { status: 500 }
    );
  }
}
