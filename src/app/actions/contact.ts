"use server";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const websiteUrl = asString(formData.get("website_url"));
  if (websiteUrl) {
    return { ok: true, message: "Thank you. Your message has been sent." };
  }

  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const message = asString(formData.get("message"));
  const mathAnswer = asString(formData.get("math_answer"));
  const expected = asString(formData.get("math_expected"));

  if (!name || !email || !message) {
    return { ok: false, message: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (!mathAnswer || Number(mathAnswer) !== Number(expected)) {
    return { ok: false, message: "The math challenge answer is incorrect." };
  }

  // Wire to an email provider (Resend, Nodemailer, etc.) when credentials are available.
  console.info("[contact]", { name, email, message });

  return {
    ok: true,
    message: "Thank you. Your message has been sent to Laura.",
  };
}
