"use client";

import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export function FreeSamplesCapture() {
  const [email, setEmail] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    toast.success("Free samples sent!");
    setEmail("");
  };

  return (
    <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm placeholder:text-white/70 sm:max-w-sm"
      />
      <button
        type="submit"
        className="rounded-lg bg-gold px-5 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-amber-400"
      >
        Send free samples
      </button>
    </form>
  );
}
