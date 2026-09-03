"use server";

import { isEmailConfigured, sendContactEmail } from "@/lib/email/send";

export type ContactActionState = {
  error?: string;
  success?: string;
  delivered?: boolean;
};

export async function sendContactMessage(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email." };
  }

  if (!isEmailConfigured()) {
    return {
      success:
        "Thanks — your message was validated. Add RESEND_API_KEY and EMAIL_FROM to send real email.",
      delivered: false,
    };
  }

  try {
    await sendContactEmail({ name, email, message });
    return {
      success: "Thanks — your message was sent.",
      delivered: true,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not send message.",
    };
  }
}
