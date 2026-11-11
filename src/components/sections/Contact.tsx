"use client";

import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { socialLinks, contactInfo } from "@/data/social-links";

/* ─── Official Limon Codes Brand ─────────────────────── */

const C = {
  bg: "#09070B",
  card: "#16111C",
  primary: "#A855F7",
  secondary: "#C4A1FF",
  accent: "#E879F9",
  text: "#F5F0FA",
  textSec: "#A9A0B2",
  muted: "#777080",
  border: "rgba(196,161,255,0.15)",
  focus: "rgba(168,85,247,0.55)",
  gradient: "linear-gradient(110deg, #A855F7 0%, #C4A1FF 52%, #E879F9 100%)",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Form Types + Validation ────────────────────────── */

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}

/* ─── Small Components ───────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <span
      className="mb-5 inline-flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-xl"
      style={{
        background: "rgba(168,85,247,0.08)",
        borderColor: C.border,
      }}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: C.accent }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ background: C.accent }}
        />
      </span>
      <span
        className="text-[10px] font-bold uppercase tracking-[0.18em] sm:text-[11px]"
        style={{ color: C.secondary }}
      >
        {children}
      </span>
    </span>
  );
}

function FieldError({ message, id }: { message?: string; id: string }) {
  if (!message) return null;

  return (
    <motion.p
      id={id}
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
    >
      <AlertCircle size={13} />
      {message}
    </motion.p>
  );
}

/* Shared field styling so input + textarea always match */
function fieldStyle(focused: boolean, hasError: boolean) {
  return {
    background: "rgba(9,7,11,0.7)",
    color: C.text,
    borderColor: hasError ? "#F87171" : focused ? C.focus : C.border,
    boxShadow: focused
      ? hasError
        ? "0 0 0 3px rgba(248,113,113,0.12)"
        : "0 0 0 3px rgba(168,85,247,0.14)"
      : "none",
  };
}

function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  autoComplete,
}: {
  id: keyof FormValues;
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched: boolean;
  placeholder: string;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = touched && !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
        style={{ color: C.textSec }}
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setFocused(false);
          onBlur(e);
        }}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className="w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all duration-200 placeholder:text-[#777080]"
        style={fieldStyle(focused, hasError)}
      />

      <FieldError id={`${id}-error`} message={hasError ? error : undefined} />
    </div>
  );
}

function FormTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}: {
  id: keyof FormValues;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  error?: string;
  touched: boolean;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = touched && !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium"
        style={{ color: C.textSec }}
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        rows={5}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setFocused(false);
          onBlur(e);
        }}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        required
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className="w-full resize-none rounded-xl border px-4 py-3.5 text-sm leading-7 outline-none transition-all duration-200 placeholder:text-[#777080]"
        style={fieldStyle(focused, hasError)}
      />

      <FieldError id={`${id}-error`} message={hasError ? error : undefined} />
    </div>
  );
}

/* ─── Main Contact Section ───────────────────────────── */

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);

  // LinkedIn link comes from @/data/social-links
  const linkedin = socialLinks.find(
    (s) =>
      s.icon.toLowerCase() === "linkedin" ||
      s.label.toLowerCase() === "linkedin"
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validate(values)).length > 0) return;

    // Form data is shown in the browser console (same behaviour as before)
    const contactData = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    console.log("========== CONTACT FORM DATA ==========");
    console.log(contactData);
    console.table([contactData]);
    console.log("=======================================");

    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setValues({ name: "", email: "", message: "" });
    setTouched({ name: false, email: false, message: false });
  };

  // Pre-filled email so the visitor can send the message from their mail app
  const mailtoHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    "Project Inquiry"
  )}&body=${encodeURIComponent(
    `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
  )}`;

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden py-24 md:py-32"
      style={{ background: C.bg, color: C.text }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(196,161,255,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 30%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 30%, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: "rgba(168,85,247,0.16)" }}
        />
        <div
          className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: "rgba(232,121,249,0.10)" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center md:mb-16"
        >
          <SectionLabel>Get in touch</SectionLabel>

          <h2 className="text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-[1.02] tracking-[-0.04em]">
            Let&apos;s work{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: C.gradient }}
            >
              together.
            </span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
            style={{ color: C.textSec }}
          >
            Have a project in mind or just want to say hello? Send me a message
            and I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Form (centered) */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto max-w-2xl overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl sm:p-8"
          style={{
            background: "rgba(22,17,28,0.7)",
            borderColor: C.border,
            boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full blur-[100px]"
            style={{ background: "rgba(168,85,247,0.2)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: C.gradient, opacity: 0.8 }}
          />

          {submitted ? (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex min-h-[380px] flex-col items-center justify-center gap-5 text-center"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full border"
                style={{
                  background: "rgba(168,85,247,0.14)",
                  borderColor: C.border,
                  color: C.secondary,
                  boxShadow: "0 0 40px rgba(168,85,247,0.25)",
                }}
              >
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="text-2xl font-bold" style={{ color: C.text }}>
                  Message ready!
                </h3>
                <p
                  className="mx-auto mt-3 max-w-sm text-sm leading-7"
                  style={{ color: C.textSec }}
                >
                  Thanks for reaching out. Open your email app to send it
                  straight to my inbox, or write another message.
                </p>
              </div>

              <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={mailtoHref}
                  className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold text-[#09070B] shadow-[0_10px_35px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(168,85,247,0.42)] active:scale-[0.97]"
                  style={{ background: C.gradient }}
                >
                  <Mail size={16} />
                  Open email app
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:border-[rgba(196,161,255,0.45)] hover:bg-[rgba(168,85,247,0.10)] active:scale-[0.97]"
                  style={{
                    borderColor: C.border,
                    background: "rgba(196,161,255,0.045)",
                    color: C.secondary,
                  }}
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative flex flex-col gap-5"
            >
              <h3
                className="mb-1 text-2xl font-bold tracking-tight"
                style={{ color: C.text }}
              >
                Tell me about your idea.
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormInput
                  id="name"
                  label="Full Name *"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  placeholder="Your name"
                  autoComplete="name"
                />

                <FormInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <FormTextarea
                id="message"
                label="Your Message *"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                touched={touched.message}
                placeholder="Tell me about your project or idea..."
              />

              <motion.button
                type="submit"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="group mt-1 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-bold text-[#09070B] shadow-[0_10px_35px_rgba(168,85,247,0.28)] transition-shadow duration-300 hover:shadow-[0_14px_44px_rgba(168,85,247,0.42)]"
                style={{ background: C.gradient }}
              >
                <Send size={16} />
                Send Message
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Buttons (same style as the "Play With Me / Hire Me" buttons) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {linkedin && (
            <a
              href={linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-[#18161A] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(196,161,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(168,85,247,0.55)]"
            >
              LinkedIn →
            </a>
          )}

          <a
            href={contactInfo.resumeUrl}
            download
            className="rounded-lg px-8 py-4 text-sm font-semibold text-[#09070B] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(168,85,247,0.55)]"
            style={{ background: C.secondary }}
          >
            Download Resume →
          </a>
        </div>
      </div>
    </section>
  );
}