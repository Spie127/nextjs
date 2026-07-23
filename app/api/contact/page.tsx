"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-vermilion">
          Get in touch
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">
          Contact
        </h1>
        <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
          Questions, corrections, or a topic you'd like covered — send a
          message and I'll get back to you.
        </p>

        {status === "sent" ? (
          <div className="mt-10 border border-line bg-marigold/10 p-6">
            <p className="font-display text-sm font-medium text-ink">
              Message sent — thanks for reaching out.
            </p>
            <p className="mt-1 font-body text-sm text-ink/70">
              I'll reply to your email as soon as I can.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <div>
              <label
                htmlFor="name"
                className="font-mono text-xs uppercase tracking-wide text-ink/60"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="focus-ring mt-2 w-full border border-line bg-transparent px-4 py-3 font-body text-sm text-ink"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="font-mono text-xs uppercase tracking-wide text-ink/60"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="focus-ring mt-2 w-full border border-line bg-transparent px-4 py-3 font-body text-sm text-ink"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="font-mono text-xs uppercase tracking-wide text-ink/60"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="focus-ring mt-2 w-full border border-line bg-transparent px-4 py-3 font-body text-sm text-ink"
              />
            </div>

            {status === "error" && (
              <p className="font-body text-sm text-vermilion">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="focus-ring w-fit bg-ink px-6 py-3 font-display text-sm font-medium text-paper transition hover:bg-vermilion disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
