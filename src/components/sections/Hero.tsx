"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
  type PointerEvent,
  type ReactElement,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Download, Sparkles, Code2 } from "lucide-react";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { socialLinks } from "@/data/social-links";

/* Official Limon Codes brand identity */
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
  gradient: "linear-gradient(110deg, #A855F7 0%, #C4A1FF 52%, #E879F9 100%)",
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* "Aspiring" only appears for the skill still being learned */
const developerRoles = [
  { label: "Full-Stack Developer", aspiring: true },
  { label: "Frontend Developer", aspiring: false },
  { label: "React Developer", aspiring: false },
  { label: "Next.js Developer", aspiring: false },
];

const quickFacts = [
  { label: "Focus", value: "Full Stack" },
  { label: "Stack", value: "Next.js + MERN" },
  { label: "Status", value: "Open to work" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Tech icons (inline SVG, brand-coloured via currentColor) ---------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ICONS: Record<string, (size: number) => ReactElement> = {
  React: (s) => (
    <svg aria-hidden="true" viewBox="-12 -12 24 24" width={s} height={s} {...stroke} strokeWidth={1.1}>
      <circle r="1.8" fill="currentColor" stroke="none" />
      <ellipse rx="10" ry="4.2" />
      <ellipse rx="10" ry="4.2" transform="rotate(60)" />
      <ellipse rx="10" ry="4.2" transform="rotate(120)" />
    </svg>
  ),
  "Next.js": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} {...stroke}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9.3 16V8.2l6.2 8.1" />
      <path d="M15.2 8v4" />
    </svg>
  ),
  TypeScript: (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <text
        x="12"
        y="16.2"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
      >
        TS
      </text>
    </svg>
  ),
  "Tailwind CSS": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6 12z" />
    </svg>
  ),
  "Node.js": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} {...stroke}>
      <path d="M12 2.5l8.2 4.7v9.6L12 21.5l-8.2-4.7V7.2z" />
      <path d="M9.4 15.4V9l5.2 6V8.8" />
    </svg>
  ),
  "Express.js": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
      >
        ex
      </text>
    </svg>
  ),
  MongoDB: (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} {...stroke}>
      <path d="M12 2c-.5 2.6-4.3 4.9-4.3 9.7 0 3.4 1.8 5.6 3.7 6.6V22h1.2v-3.7c1.9-1 3.7-3.2 3.7-6.6C16.3 6.9 12.5 4.6 12 2z" />
      <path d="M12 8v10" />
    </svg>
  ),
  "Framer Motion": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <path d="M5 1h14v7h-7L5 1zM5 8h7l7 7H5V8zM5 15h7v8l-7-8z" />
    </svg>
  ),
  "Git & GitHub": (s) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  ),
};

const techStack = Object.keys(ICONS);

/* Icon chips that float around the portrait */
const orbitChips: {
  name: string;
  position: string;
  duration: number;
  delay: number;
}[] = [
  { name: "React", position: "-right-3 top-[9%] sm:-right-6", duration: 5.2, delay: 0 },
  { name: "Next.js", position: "-left-3 top-[22%] sm:-left-6", duration: 6, delay: 0.6 },
  { name: "Node.js", position: "-right-3 top-[44%] sm:-right-7", duration: 5.6, delay: 1.1 },
  { name: "MongoDB", position: "-left-3 top-[46%] sm:-left-7", duration: 6.4, delay: 0.3 },
];

/* ---------- Social icons (keys match the `icon` field in social-links.ts) ---------- */
function GithubIcon() {
  return ICONS["Git & GitHub"](18);
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ReactElement> = {
  github: <GithubIcon />,
  facebook: <FacebookIcon />,
  linkedin: <FaLinkedin size={18} />,
  email: <FaEnvelope size={18} />,
};

function getSocialIcon(key: string): ReactElement {
  return SOCIAL_ICONS[key.toLowerCase()] ?? <Code2 size={18} />;
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState(0);
  const [glowVisible, setGlowVisible] = useState(false);

  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const glowX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.8 });
  const glowY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.8 });

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 18 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => {
      setActiveRole((current) => (current + 1) % developerRoles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const handleSectionMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
    setGlowVisible(true);
  };

  const handleTiltMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.65, ease: EASE },
  });

  return (
    <section
      id="home"
      onPointerMove={handleSectionMove}
      onPointerLeave={() => setGlowVisible(false)}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: BRAND.background, color: BRAND.text }}
    >
      {/* Hidden SVG filter: clean outline for the name */}
      <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
        <filter id="limon-outline" x="-5%" y="-5%" width="110%" height="110%">
          <feMorphology in="SourceAlpha" operator="erode" radius="1.6" result="inner" />
          <feComposite in="SourceGraphic" in2="inner" operator="out" />
        </filter>
      </svg>

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(196,161,255,0.14) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full blur-[160px]"
          style={{ background: "rgba(168,85,247,0.18)" }}
        />
        <div
          className="absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full blur-[160px]"
          style={{ background: "rgba(232,121,249,0.10)" }}
        />
      </div>

      {/* Cursor glow (desktop only) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-[480px] w-[480px] rounded-full blur-3xl lg:block"
        style={{
          x: glowX,
          y: glowY,
          marginLeft: -240,
          marginTop: -240,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.16) 0%, rgba(196,161,255,0.06) 42%, transparent 72%)",
        }}
        animate={{ opacity: glowVisible ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-14 px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:px-12 lg:pt-28 xl:px-8">
        {/* Left */}
        <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
          <motion.div
            {...fadeUp(0)}
            className="mb-7 inline-flex max-w-full items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-xl"
            style={{
              background: "rgba(168,85,247,0.08)",
              borderColor: BRAND.border,
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ background: BRAND.accent }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: BRAND.accent }}
              />
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]"
              style={{ color: BRAND.secondary }}
            >
              Available for work
            </span>
            <span className="hidden h-3 w-px sm:block" style={{ background: BRAND.border }} />
            <span
              className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] sm:block sm:text-[11px]"
              style={{ color: BRAND.secondaryText }}
            >
              Diploma Student
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.06)}
            className="mb-2 text-sm font-medium tracking-wide sm:text-base"
            style={{ color: BRAND.muted }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={
              reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
            className="text-[clamp(3.2rem,11vw,7rem)] font-black leading-[0.94] tracking-[-0.045em]"
          >
            <span
              className="block"
              style={{ color: BRAND.text, filter: "url(#limon-outline)" }}
            >
              Limon
            </span>
            <span
              className="mt-1 inline-block bg-clip-text pb-2 text-transparent"
              style={{ backgroundImage: BRAND.gradient }}
            >
              Islam
            </span>
          </motion.h1>

          <motion.div
            {...fadeUp(0.26)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg font-semibold sm:text-xl lg:justify-start"
          >
            <span
              className="hidden h-px w-10 sm:block"
              style={{ background: BRAND.gradient }}
            />
            <span className="relative inline-grid">
              <span aria-hidden="true" className="invisible whitespace-nowrap">
                Aspiring Full-Stack Developer
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={developerRoles[activeRole].label}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 12, filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -10, filter: "blur(4px)" }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 whitespace-nowrap text-center lg:text-left"
                >
                  {developerRoles[activeRole].aspiring && (
                    <span style={{ color: BRAND.secondaryText }}>Aspiring </span>
                  )}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: BRAND.gradient }}
                  >
                    {developerRoles[activeRole].label}
                  </span>
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            {...fadeUp(0.34)}
            className="mx-auto mt-6 max-w-xl text-sm leading-7 sm:text-base sm:leading-8 lg:mx-0"
            style={{ color: BRAND.secondaryText }}
          >
            I enjoy building modern digital experiences with React and Next.js.
            Currently exploring backend development with Node.js, Express.js,
            and MongoDB, turning ideas into functional web applications.
          </motion.p>

          <motion.div
            {...fadeUp(0.42)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <Link
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold text-[#09070B] shadow-[0_10px_35px_rgba(168,85,247,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(168,85,247,0.42)] active:scale-[0.97] sm:px-7"
              style={{ background: BRAND.gradient }}
            >
              Explore Projects
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-1 hover:border-[rgba(196,161,255,0.45)] hover:bg-[rgba(168,85,247,0.10)] active:scale-[0.97] sm:px-7"
              style={{
                borderColor: BRAND.border,
                background: "rgba(196,161,255,0.045)",
                color: BRAND.secondary,
              }}
            >
              <Download
                size={16}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
              Download CV
            </a>

            {/* Social icons, driven by @/data/social-links */}
            {socialLinks.map((social) => {
              const isMail = social.href.startsWith("mailto:");

              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(isMail
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={
                    isMail ? "Send me an email" : `${social.label} profile`
                  }
                  title={social.label}
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-full border transition duration-300 hover:-translate-y-1 hover:border-[rgba(196,161,255,0.45)] hover:text-[#C4A1FF] active:scale-[0.97]"
                  style={{
                    borderColor: BRAND.border,
                    color: BRAND.secondaryText,
                    background: "rgba(196,161,255,0.045)",
                  }}
                >
                  {getSocialIcon(social.icon)}
                </a>
              );
            })}
          </motion.div>

          <motion.dl
            {...fadeUp(0.55)}
            className="mt-9 grid grid-cols-3 gap-2.5 text-left sm:gap-3"
          >
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="relative overflow-hidden rounded-2xl border px-3.5 py-3.5 backdrop-blur-xl sm:px-4"
                style={{
                  background: "rgba(22,17,28,0.65)",
                  borderColor: BRAND.border,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: BRAND.gradient, opacity: 0.7 }}
                />
                <dt
                  className="text-[9px] font-bold uppercase tracking-[0.2em] sm:text-[10px]"
                  style={{ color: BRAND.muted }}
                >
                  {fact.label}
                </dt>
                <dd
                  className="mt-1.5 text-xs font-bold sm:text-sm"
                  style={{ color: BRAND.text }}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: premium portrait */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative mx-auto w-full max-w-[420px] px-6 py-6 sm:max-w-[480px] sm:px-10"
        >
          {/* ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[45%] h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
            style={{ background: "rgba(168,85,247,0.32)" }}
          />

          {/* static ring */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[44%] h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: "rgba(196,161,255,0.10)" }}
          />

          {/* orbiting light dot */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[44%] h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: BRAND.accent,
                boxShadow: "0 0 16px 3px rgba(232,121,249,0.6)",
              }}
            />
          </motion.div>

          <div
            onPointerMove={handleTiltMove}
            onPointerLeave={resetTilt}
            className="relative z-10 mx-auto w-full max-w-[340px]"
          >
            <motion.div
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative"
            >
              {/* Gradient-border frame with bottom fade */}
              <div
                className="rounded-[30px] p-px"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(196,161,255,0.75) 0%, rgba(168,85,247,0.18) 42%, rgba(232,121,249,0.5) 100%)",
                  boxShadow:
                    "0 30px 90px rgba(0,0,0,0.55), 0 0 60px rgba(168,85,247,0.16)",
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 68%, transparent 100%)",
                }}
              >
                <div
                  className="relative isolate aspect-[4/5] overflow-hidden rounded-[29px]"
                  style={{ background: BRAND.surface }}
                >
                  <Image
                    src="/limon.jpg"
                    alt="Limon Islam - Web Developer"
                    fill
                    priority
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 42vw, 340px"
                    className="object-cover object-[center_16%]"
                    style={{
                      filter: "grayscale(1) contrast(1.12) brightness(0.98)",
                    }}
                  />
                  {/* purple colour map */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      mixBlendMode: "color",
                      background:
                        "linear-gradient(160deg, #A855F7 0%, #C4A1FF 55%, #E879F9 100%)",
                      opacity: 0.9,
                    }}
                  />
                  {/* vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 30%, transparent 40%, rgba(9,7,11,0.55) 100%)",
                    }}
                  />
                  {/* film grain */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage: GRAIN,
                      mixBlendMode: "overlay",
                      opacity: 0.18,
                    }}
                  />
                  {/* light sheen sweep */}
                  {!reduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-[20deg]"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(245,240,250,0.16), transparent)",
                      }}
                      initial={{ x: "-150%" }}
                      animate={{ x: "450%" }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 4,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* top label */}
              <span
                className="absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] backdrop-blur-xl"
                style={{
                  background: "rgba(9,7,11,0.55)",
                  borderColor: "rgba(245,240,250,0.2)",
                  color: BRAND.text,
                }}
              >
                LIMON CODES
              </span>

              {/* floating tech icon chips */}
              {orbitChips.map((chip) => (
                <motion.div
                  key={chip.name}
                  title={chip.name}
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: chip.duration,
                    delay: chip.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl sm:h-[52px] sm:w-[52px] ${chip.position}`}
                  style={{
                    background: "rgba(22,17,28,0.88)",
                    borderColor: "rgba(196,161,255,0.25)",
                    color: BRAND.secondary,
                    boxShadow:
                      "0 14px 34px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,240,250,0.08)",
                  }}
                >
                  {ICONS[chip.name](22)}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Focus card */}
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1 right-0 z-20 rounded-2xl border p-3 shadow-2xl backdrop-blur-xl sm:bottom-[3%] sm:p-3.5"
            style={{
              background: "rgba(22,17,28,0.92)",
              borderColor: BRAND.border,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(168,85,247,0.15)",
                  color: BRAND.secondary,
                }}
              >
                <Sparkles size={16} />
              </span>
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.16em]"
                  style={{ color: BRAND.muted }}
                >
                  Current focus
                </p>
                <p
                  className="mt-0.5 text-xs font-bold"
                  style={{ color: BRAND.text }}
                >
                  Full Stack Development
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech marquee with icons */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8 lg:px-12 xl:px-8">
        <div
          className="overflow-hidden rounded-full border py-3.5 backdrop-blur-xl"
          style={{
            borderColor: BRAND.border,
            background: "rgba(22,17,28,0.6)",
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
          aria-label="Technologies I work with"
        >
          <motion.div
            className="flex w-max items-center gap-9 sm:gap-12"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs"
                style={{ color: BRAND.secondaryText }}
              >
                <span style={{ color: BRAND.secondary }}>
                  {ICONS[tech](16)}
                </span>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}