import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import { modulesConfig } from "@/config/modules";

export function isEmailConfigured() {
  if (!modulesConfig.email) return false;
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return false;
  if (key.includes("your-resend") || from.includes("your-domain")) return false;
  return true;
}

export async function sendContactEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  if (!isEmailConfigured()) {
    throw new Error("Email is not configured.");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.EMAIL_TO ?? siteConfig.contactEmail;
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to,
    replyTo: input.email,
    subject: `Contact form: ${input.name}`,
    text: `${input.message}\n\n— ${input.name} <${input.email}>`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
