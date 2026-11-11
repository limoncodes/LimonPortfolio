"use client";

import { motion, useReducedMotion } from "framer-motion";
import { socialLinks, contactInfo } from "@/data/social-links";
import { ArrowUpRight, ArrowUp, Code2 } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Syne } from "next/font/google";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";

// Distinctive display font, used only for the big decorative brand word
const displayFont = Syne({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

// ─── Official Limon Codes Brand ─────────────────────────

const BRAND = {
  background: "#09070B",
  surface: "#16111C",
  primary: "#A855F7",
  secondary: "#C4A1FF",
  accent: "#E879F9",
  text: "#F5F0FA",
  secondaryText: "#A9A0B2",
  muted: "#777080",
  border: "rgba(196,161,255,0.15)",
  gradient:
    "linear-gradient(110deg, #A855F7 0%, #C4A1FF 50%, #E879F9 100%)",
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Inline Brand Icons ─────────────────────────────────

const GithubSVG = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const FacebookSVG = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const DiscordSVG = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.11 18.1.128 18.11a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

// ─── Social Icon Map (key = `icon` field in social-links.ts) ─────

const iconMap: Record<string, ReactNode> = {
  github: <GithubSVG />,
  linkedin: <FaLinkedin />,
  facebook: <FacebookSVG />,
  discord: <DiscordSVG />,
  email: <FaEnvelope />,
};

function getIcon(key: string): ReactNode {
  return iconMap[key.toLowerCase()] ?? <Code2 size={17} />;
}

// ─── Navigation Links ───────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// ─── Footer Component ───────────────────────────────────

export default function Footer() {
  // Stable initial value (same on server and client), then the real year is set
  // after mount. This avoids Next.js's "unstable new Date() in a Client
  // Component" error during prerender.
  const [year, setYear] = useState(2026);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Smooth scroll navigation

  const handleNavigation = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  // Shared scroll-reveal animation

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  // Opens the visitor's default mail app (Gmail / Outlook / Apple Mail etc.)
  const mailtoHref = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
    "Project Inquiry"
  )}`;

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: BRAND.background,
        borderTop: `1px solid ${BRAND.border}`,
      }}
    >
      {/* Clean outline filters (same technique as the hero name) */}

      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: "absolute" }}
      >
        <filter
          id="footer-outline"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
        >
          <feMorphology
            in="SourceAlpha"
            operator="erode"
            radius="1.4"
            result="inner"
          />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>

        <filter
          id="footer-outline-lg"
          x="-3%"
          y="-5%"
          width="106%"
          height="110%"
        >
          <feMorphology
            in="SourceAlpha"
            operator="erode"
            radius="2.2"
            result="inner"
          />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
      </svg>

      {/* ─── Ambient Background ─── */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(196,161,255,0.10) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 0%, transparent 100%)",
          }}
        />

        <div
          className="absolute bottom-[-200px] left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: "rgba(168,85,247,0.12)" }}
        />

        <div
          className="absolute right-[-120px] top-10 h-[280px] w-[280px] rounded-full blur-[130px]"
          style={{ background: "rgba(232,121,249,0.07)" }}
        />
      </div>

      {/* Top gradient line */}

      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: BRAND.gradient, opacity: 0.5 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-10 sm:pt-16 lg:px-12 lg:pt-20">
        {/* ═════════ CALL TO ACTION ═════════ */}

        <motion.div
          {...reveal(0)}
          className="relative overflow-hidden rounded-[28px] border p-7 backdrop-blur-xl sm:p-10 lg:p-12"
          style={{
            borderColor: BRAND.border,
            background: "rgba(22,17,28,0.7)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full blur-[110px]"
            style={{ background: "rgba(168,85,247,0.22)" }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: BRAND.gradient, opacity: 0.7 }}
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div>
              <p
                className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-[11px]"
                style={{ color: BRAND.secondary }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ background: BRAND.accent }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ background: BRAND.accent }}
                  />
                </span>
                Open to opportunities
              </p>

              <h2
                className="text-[clamp(1.9rem,4.8vw,3.4rem)] font-black leading-[1.05] tracking-[-0.04em]"
                style={{ color: BRAND.text }}
              >
                Let&apos;s build something{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: BRAND.gradient }}
                >
                  remarkable together.
                </span>
              </h2>

              <p
                className="mt-5 max-w-xl text-sm leading-7 sm:text-base"
                style={{ color: BRAND.secondaryText }}
              >
                Have an idea, a project or an opportunity in mind? I&apos;d love
                to hear about it and help turn it into a fast, modern web
                experience.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {/* Opens the mail app with the email ready to send */}
              <a
                href={mailtoHref}
                className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-bold text-[#09070B] shadow-[0_10px_35px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(168,85,247,0.42)] active:scale-[0.97]"
                style={{ background: BRAND.gradient }}
              >
                Start a project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="#projects"
                onClick={(e) => handleNavigation(e, "#projects")}
                className="inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:border-[rgba(196,161,255,0.45)] hover:bg-[rgba(168,85,247,0.10)] active:scale-[0.97]"
                style={{
                  borderColor: BRAND.border,
                  background: "rgba(196,161,255,0.045)",
                  color: BRAND.secondary,
                }}
              >
                View projects
              </a>
            </div>
          </div>
        </motion.div>

        {/* ═════════ FOOTER MAIN ═════════ */}

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1.4fr_0.8fr_0.9fr] lg:gap-14">
          {/* ─── Brand Column ─── */}

          <motion.div {...reveal(0)} className="sm:col-span-2 lg:col-span-1">
            <p
              className="text-[clamp(2.6rem,6vw,4rem)] font-black leading-[0.94] tracking-[-0.045em]"
              style={{ color: BRAND.text }}
            >
              <span
                className="block"
                style={{ filter: "url(#footer-outline)" }}
              >
                Limon
              </span>

              <span
                className="mt-1 block bg-clip-text pb-1 text-transparent"
                style={{ backgroundImage: BRAND.gradient }}
              >
                Codes<span style={{ color: BRAND.accent }}>.</span>
              </span>
            </p>

            <p
              className="mt-6 max-w-sm text-sm leading-7"
              style={{ color: BRAND.secondaryText }}
            >
              Building the web with curiosity, creativity, and a passion for
              meaningful digital experiences.
            </p>

            <div
              className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border px-4 py-2.5"
              style={{
                borderColor: BRAND.border,
                background: "rgba(168,85,247,0.055)",
              }}
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  background: BRAND.accent,
                  boxShadow: "0 0 10px rgba(232,121,249,0.5)",
                }}
              />

              <span
                className="text-xs font-medium"
                style={{ color: BRAND.secondary }}
              >
                Designed &amp; Developed by Limon Islam
              </span>
            </div>
          </motion.div>

          {/* ─── Explore ─── */}

          <motion.div {...reveal(0.08)}>
            <h3
              className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: BRAND.muted }}
            >
              Explore
            </h3>

            <nav
              aria-label="Footer navigation"
              className="flex flex-col items-start gap-1"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="group flex items-center gap-0 py-1.5 text-sm transition-all duration-300 hover:gap-3 hover:text-[#C4A1FF]"
                  style={{ color: BRAND.secondaryText }}
                >
                  <span
                    className="h-px w-0 transition-all duration-300 group-hover:w-4"
                    style={{ background: BRAND.accent }}
                  />

                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* ─── Connect ─── */}

          <motion.div {...reveal(0.16)}>
            <h3
              className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: BRAND.muted }}
            >
              Connect
            </h3>

            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => {
                // mailto: links open the mail app, so no new browser tab
                const isMail = social.href.startsWith("mailto:");

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    {...(isMail
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    aria-label={
                      isMail
                        ? "Send me an email"
                        : `Visit my ${social.label}`
                    }
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="group flex items-center gap-3 rounded-2xl border p-2.5 pr-4 text-sm backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(196,161,255,0.4)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[#C4A1FF]"
                    style={{
                      color: BRAND.secondaryText,
                      borderColor: BRAND.border,
                      background: "rgba(22,17,28,0.6)",
                    }}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-[#E879F9]"
                      style={{
                        background: "rgba(168,85,247,0.10)",
                        color: BRAND.secondary,
                      }}
                    >
                      {getIcon(social.icon)}
                    </span>

                    <span className="font-medium">{social.label}</span>

                    <ArrowUpRight
                      size={14}
                      className="ml-auto opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ═════════ LARGE DECORATIVE BRAND TEXT ═════════ */}

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
          className="group relative mt-14 overflow-hidden border-b pb-6 [container-type:inline-size] sm:mt-20"
          style={{ borderColor: BRAND.border }}
        >
          {/* Soft purple glow behind the word */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
            style={{ background: "rgba(168,85,247,0.16)" }}
          />

          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.3) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 40%, rgba(0,0,0,0.3) 100%)",
            }}
          >
            {/* Faint fill that brightens on hover */}

            <p
              aria-hidden="true"
              className={`${displayFont.className} pointer-events-none absolute inset-0 select-none whitespace-nowrap bg-clip-text text-center text-[clamp(1.5rem,7.4vw,6.4rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-transparent opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.22]`}
              style={{
                backgroundImage: BRAND.gradient,
                fontSize: "calc(100cqw / 12.6)",
              }}
            >
              LIMON CODES
            </p>

            {/* Gradient outline with a slow light sweep */}

            <motion.p
              className={`${displayFont.className} select-none whitespace-nowrap bg-clip-text text-center text-[clamp(1.5rem,7.4vw,6.4rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-transparent`}
              style={{
                backgroundImage:
                  "linear-gradient(110deg, #A855F7 0%, #C4A1FF 25%, #E879F9 50%, #C4A1FF 75%, #A855F7 100%)",
                backgroundSize: "200% 100%",
                fontSize: "calc(100cqw / 12.6)",
                opacity: 0.92,
                filter: "url(#footer-outline-lg)",
              }}
              animate={
                reduceMotion
                  ? undefined
                  : { backgroundPosition: ["0% 50%", "100% 50%"] }
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              LIMON CODES
            </motion.p>
          </div>
        </motion.div>

        {/* ═════════ BOTTOM BAR ═════════ */}

        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center md:flex-row md:text-left">
          <p className="text-xs leading-6" style={{ color: BRAND.muted }}>
            © {year}{" "}
            <span
              className="font-semibold"
              style={{ color: BRAND.secondaryText }}
            >
              Limon Islam
            </span>
            . All rights reserved.
          </p>

          <a
            href="#home"
            onClick={(e) => handleNavigation(e, "#home")}
            className="group inline-flex items-center gap-3 text-xs font-semibold transition-colors duration-300 hover:text-[#E879F9]"
            style={{ color: BRAND.secondary }}
          >
            Back to top
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(196,161,255,0.45)] group-hover:bg-[rgba(168,85,247,0.10)]"
              style={{ borderColor: BRAND.border }}
            >
              <ArrowUp size={14} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}