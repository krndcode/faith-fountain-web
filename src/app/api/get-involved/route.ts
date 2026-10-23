import { NextRequest, NextResponse } from "next/server";
import { getInvolvedFormSchema } from "@/lib/validation/contact";
import { saveInquiryToFirestore } from "@/lib/firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = getInvolvedFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, areaOfInterest, message, privacyConsent } =
      validation.data;

    const result = await saveInquiryToFirestore({
      type: "get-involved",
      name,
      email,
      phone: phone || undefined,
      areaOfInterest,
      message,
      privacyConsent,
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      message:
        "Thank you for your willingness to support Faith Fountain Foundation! We have received your inquiry and our team will be in touch with you.",
    });
  } catch (error: any) {
    console.error("Error submitting get-involved inquiry:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or reach out directly via WhatsApp." },
      { status: 500 }
    );
  }
}
