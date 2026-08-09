"use client";

import { useActionState, useMemo, useState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";

const initialState: ContactFormState = {
  ok: false,
  message: "",
};

type MathChallenge = {
  a?: number;
  b?: number;
  expected?: number;
  question?: string;
};

function createChallenge(): MathChallenge {
  const a = Math.floor(Math.random() * 8) + 2;
  const b = Math.floor(Math.random() * 8) + 1;
  return { a, b, expected: a + b, question: `${a} + ${b} = ?` };
}

export function ContactForm() {
  const [challenge, setChallenge] = useState<MathChallenge | null>(createChallenge);
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  const question = useMemo(
    () =>
      challenge?.question ??
      (challenge?.a !== undefined && challenge?.b !== undefined
        ? `${challenge.a} + ${challenge.b} = ?`
        : ""),
    [challenge?.question, challenge?.a, challenge?.b],
  );

  return (
    <form
      action={(formData) => {
        formAction(formData);
        setChallenge(createChallenge());
      }}
      className="mx-auto w-full max-w-lg space-y-5"
      noValidate
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <label htmlFor="website_url">Website</label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className="block text-xs tracking-[0.16em] uppercase opacity-70">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full border border-[#2A2A2A]/20 bg-transparent px-3 py-2.5 font-serif outline-none focus:border-[#2A2A2A]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-xs tracking-[0.16em] uppercase opacity-70">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-[#2A2A2A]/20 bg-transparent px-3 py-2.5 font-serif outline-none focus:border-[#2A2A2A]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs tracking-[0.16em] uppercase opacity-70">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y border border-[#2A2A2A]/20 bg-transparent px-3 py-2.5 font-serif outline-none focus:border-[#2A2A2A]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="math_answer" className="block text-xs tracking-[0.16em] uppercase opacity-70">
          What is {challenge?.question ?? question}
        </label>
        <input type="hidden" name="math_expected" value={challenge?.expected ?? 0} />
        <input
          id="math_answer"
          name="math_answer"
          inputMode="numeric"
          required
          className="w-full border border-[#2A2A2A]/20 bg-transparent px-3 py-2.5 font-serif outline-none focus:border-[#2A2A2A]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border border-[#2A2A2A] bg-[#2A2A2A] px-6 py-3 text-xs tracking-[0.18em] uppercase text-[#FDFBF7] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      {state.message ? (
        <p
          role="status"
          className={`font-serif text-sm ${state.ok ? "text-[#2A2A2A]" : "text-red-800"}`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
