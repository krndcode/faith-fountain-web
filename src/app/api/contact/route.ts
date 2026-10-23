import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { saveInquiryToFirestore } from "@/lib/firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, privacyConsent } =
      validation.data;

    const result = await saveInquiryToFirestore({
      type: "contact",
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
      privacyConsent,
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Thank you for reaching out. We have received your message and will respond promptly.",
    });
  } catch (error: any) {
    console.error("Error submitting contact inquiry:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or reach out directly via WhatsApp." },
      { status: 500 }
    );
  }
}
