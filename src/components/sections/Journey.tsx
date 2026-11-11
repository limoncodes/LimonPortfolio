"use client";

import type { MouseEvent } from "react";
import { MotionConfig, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  Code2,
  BookOpen,
  Rocket,
  Target,
  Sparkles,
} from "lucide-react";

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

const GLASS = {
  card: "linear-gradient(145deg, rgba(22,17,28,0.82), rgba(22,17,28,0.52))",
};

// ─── Types ─────────────────────────────────────────────

type CategoryKey = "Education" | "Learning" | "Milestone" | "Frontend";

type JourneyItem = {
  year: string;
  title: string;
  description: string;
  category: CategoryKey;
  icon: LucideIcon;
  status: "completed" | "current" | "upcoming";
};

// ─── Journey Data ──────────────────────────────────────

const journeyData: JourneyItem[] = [
  {
    year: "2023–24",
    title: "Started My Academic Journey",
    description:
      "Started my Diploma in Computer Science and Technology at Image Polytechnic Institute, Rangpur.",
    category: "Education",
    icon: GraduationCap,
    status: "completed",
  },
  {
    year: "2025",
    title: "Discovered Web Development",
    description:
      "Started my web development journey with HTML, CSS, and JavaScript. Began learning how websites are created.",
    category: "Learning",
    icon: Code2,
    status: "completed",
  },
  {
    year: "2025",
    title: "Built My Frontend Foundation",
    description:
      "Learned responsive web design, Tailwind CSS, JavaScript fundamentals, and modern frontend development concepts.",
    category: "Frontend",
    icon: BookOpen,
    status: "completed",
  },
  {
    year: "2026",
    title: "Entered the React Ecosystem",
    description:
      "Started building interactive applications using React, TypeScript, React Hooks, and reusable components.",
    category: "Frontend",
    icon: Code2,
    status: "completed",
  },
  {
    year: "2026",
    title: "Exploring Next.js & Full Stack",
    description:
      "Learning Next.js, authentication, Express.js, MongoDB, and backend development while building full-stack projects.",
    category: "Learning",
    icon: Rocket,
    status: "current",
  },
  {
    year: "2027",
    title: "My Next Big Milestone",
    description:
      "My goal is to build real-world applications, improve my development skills, and gain professional experience.",
    category: "Milestone",
    icon: Target,
    status: "upcoming",
  },
];

// ─── Category Styles (brand colours only) ──────────────

const categoryDot: Record<CategoryKey, string> = {
  Education: BRAND.secondary,
  Learning: BRAND.accent,
  Milestone: BRAND.primary,
  Frontend: BRAND.secondary,
};

// ─── Status Styles ─────────────────────────────────────

const statusStyles = {
  completed: {
    label: "Completed",
    color: BRAND.secondary,
    background: "rgba(168,85,247,0.10)",
    dot: BRAND.primary,
  },
  current: {
    label: "Currently learning",
    color: BRAND.accent,
    background: "rgba(232,121,249,0.10)",
    dot: BRAND.accent,
  },
  upcoming: {
    label: "Upcoming",
    color: BRAND.muted,
    background: "rgba(119,112,128,0.12)",
    dot: BRAND.muted,
  },
};

// Timeline node look per status
const nodeStyles = {
  completed: {
    borderColor: "rgba(196,161,255,0.3)",
    background: BRAND.surface,
    boxShadow: "none",
    iconColor: BRAND.secondary,
  },
  current: {
    borderColor: "rgba(232,121,249,0.6)",
    background: "rgba(168,85,247,0.2)",
    boxShadow: "0 0 28px rgba(168,85,247,0.35)",
    iconColor: BRAND.text,
  },
  upcoming: {
    borderColor: BRAND.border,
    background: BRAND.surface,
    boxShadow: "none",
    iconColor: BRAND.muted,
  },
};

// ─── Cursor spotlight ──────────────────────────────────

function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

// ─── Journey Component ─────────────────────────────────

export default function Journey() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="journey"
        className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
        style={{ background: BRAND.background, color: BRAND.text }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-[0.1] blur-[140px]"
          style={{ background: BRAND.primary }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full opacity-[0.07] blur-[130px]"
          style={{ background: BRAND.accent }}
        />

        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(196,161,255,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* ─── Section Header ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center sm:mb-20"
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-md"
              style={{
                color: BRAND.secondary,
                borderColor: BRAND.border,
                background: "rgba(168,85,247,0.08)",
              }}
            >
              <Sparkles size={14} />
              My journey
            </div>

            <h2
              className="text-4xl font-bold leading-[1.1] tracking-[-0.045em] sm:text-5xl lg:text-6xl"
              style={{
                background: BRAND.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The path of my growth
            </h2>

            <p
              className="mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: BRAND.secondaryText }}
            >
              Every developer has a story. This is mine — a journey of
              learning, building, making mistakes, and growing one step at a
              time.
            </p>
          </motion.div>

          {/* ─── Timeline ─── */}
          <div className="relative">
            {/* Line */}
            <div
              aria-hidden
              className="absolute bottom-0 left-[19px] top-0 w-px md:left-1/2 md:-translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, #A855F7, rgba(196,161,255,0.35) 55%, transparent)",
              }}
            />

            <div className="space-y-12 md:space-y-16">
              {journeyData.map((item, index) => {
                const Icon = item.icon;
                const status = statusStyles[item.status];
                const node = nodeStyles[item.status];
                const slide = index % 2 === 0 ? -45 : 45;

                return (
                  <motion.div
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, x: slide, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 md:grid-cols-[1fr_44px_1fr] md:gap-x-6"
                  >
                    {/* Card */}
                    <div
                      className={`col-start-2 row-start-1 ${
                        index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"
                      }`}
                    >
                      <motion.article
                        whileHover={{ y: -4, transition: { duration: 0.25 } }}
                        onMouseMove={trackPointer}
                        className="group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(196,161,255,0.32)] sm:p-7"
                        style={{
                          background: GLASS.card,
                          borderColor: BRAND.border,
                          boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
                        }}
                      >
                        {/* Spotlight */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), rgba(168,85,247,0.14), transparent 70%)",
                          }}
                        />

                        {/* Top gradient edge */}
                        <div
                          aria-hidden
                          className="absolute left-0 right-0 top-0 h-px opacity-70"
                          style={{ background: BRAND.gradient }}
                        />

                        <div className="relative">
                          {/* Top row */}
                          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <span
                              className="font-mono text-sm font-semibold"
                              style={{ color: BRAND.secondary }}
                            >
                              {item.year}
                            </span>

                            <span
                              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium"
                              style={{
                                color: BRAND.secondaryText,
                                borderColor: BRAND.border,
                                background: "rgba(168,85,247,0.06)",
                              }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: categoryDot[item.category] }}
                              />
                              {item.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="mb-3 text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-[#C4A1FF] sm:text-xl"
                            style={{ color: BRAND.text }}
                          >
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="text-sm leading-7"
                            style={{ color: BRAND.secondaryText }}
                          >
                            {item.description}
                          </p>

                          {/* Footer */}
                          <div
                            className="mt-6 flex items-center border-t pt-5"
                            style={{ borderColor: BRAND.border }}
                          >
                            <span
                              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium"
                              style={{
                                color: status.color,
                                background: status.background,
                              }}
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: status.dot }}
                              />
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    </div>

                    {/* Timeline node */}
                    <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                      <div className="relative z-10 h-10 w-10 sm:h-11 sm:w-11">
                        {item.status === "current" && (
                          <motion.span
                            aria-hidden
                            className="absolute inset-0 rounded-full"
                            style={{ background: BRAND.primary }}
                            animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                        )}

                        <div
                          className="relative flex h-full w-full items-center justify-center rounded-full border backdrop-blur-md"
                          style={{
                            borderColor: node.borderColor,
                            background: node.background,
                            boxShadow: node.boxShadow,
                          }}
                        >
                          <Icon
                            size={18}
                            style={{ color: node.iconColor }}
                            aria-hidden
                          />
                        </div>
                      </div>
                    </div>

                    {/* Empty side (desktop) */}
                    <div
                      className={`hidden md:block ${
                        index % 2 === 0 ? "md:col-start-3" : "md:col-start-1"
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ─── Bottom Message ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-20 text-center"
          >
            <div
              className="inline-flex items-center gap-3 rounded-full border px-6 py-3 backdrop-blur-md"
              style={{
                borderColor: BRAND.border,
                background: "rgba(168,85,247,0.06)",
              }}
            >
              <Sparkles size={16} style={{ color: BRAND.secondary }} />
              <p className="text-sm" style={{ color: BRAND.secondaryText }}>
                The journey is still going on.
                <span
                  className="ml-1 font-medium"
                  style={{ color: BRAND.secondary }}
                >
                  More to come...
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}