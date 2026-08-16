'use server';

import { Resend } from 'resend';

export type ContactFormState = {
  ok: boolean;
  message?: string;
  error?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  console.log('--- EXECUTING RESEND ACTION ---');
  console.log('API Key present:', !!process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Laura de la Riva <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'mayankdewli@gmail.com'],
      replyTo: email,
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('RESEND ERROR:', error);
      return { ok: false, error: error.message };
    }

    console.log('RESEND SUCCESS:', data);
    return { ok: true, message: 'Thank you. Your message has been sent to Laura.' };
  } catch (err) {
    console.error('SERVER ACTION CATCH ERROR:', err);
    return { ok: false, error: 'Internal Server Error' };
  }
}

export const submitContactForm = sendContactEmail;
