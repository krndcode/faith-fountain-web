import { NextRequest, NextResponse } from "next/server";
import { createOrderSchema } from "@/lib/validation/donation";
import { createPayPalOrder, isPayPalConfigured } from "@/lib/paypal/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid donation parameters",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { amount, currency } = validation.data;

    // Check if real PayPal credentials are provided
    if (!isPayPalConfigured()) {
      // In sandbox development without configured API keys, return clear simulated ID
      // so developer can test the end-to-end UI and flow without crashing
      const mockOrderId = `SANDBOX-MOCK-ORDER-${Date.now()}`;
      return NextResponse.json({
        id: mockOrderId,
        status: "CREATED",
        isSimulated: true,
        message:
          "Sandbox simulation mode: real PayPal credentials not yet supplied in .env.local",
      });
    }

    const order = await createPayPalOrder({ amount, currency });
    return NextResponse.json({ id: order.id, status: order.status });
  } catch (error: any) {
    console.error("Error in create-order endpoint:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create donation order" },
      { status: 500 }
    );
  }
}
