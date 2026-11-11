"use client";

import type { MouseEvent } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import {
  skillCategories,
  type Skill,
  type SkillCategory,
} from "@/data/skills";

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

// Glass surfaces (brand surface colour with transparency)
const GLASS = {
  card: "linear-gradient(145deg, rgba(22,17,28,0.82), rgba(22,17,28,0.52))",
  tile: "rgba(9,7,11,0.45)",
  panel: "rgba(22,17,28,0.65)",
};

// ─── Category Metadata (decorative only) ────────────────

const CATEGORY_META: Record<
  string,
  { number: string; symbol: string; subtitle: string }
> = {
  Frontend: {
    number: "01",
    symbol: "{ }",
    subtitle: "Building interfaces & experiences",
  },
  Backend: {
    number: "02",
    symbol: "</>",
    subtitle: "Logic, data & application architecture",
  },
  "Tools & Platforms": {
    number: "03",
    symbol: "⌘",
    subtitle: "Tools that power my workflow",
  },
};

// ─── Animation Variants ─────────────────────────────────

const headerReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const categoryReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const skillContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const skillReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Shared: cursor-following spotlight ─────────────────

function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

// ─── Single Skill Item ──────────────────────────────────

function SkillItem({ skill }: { skill: Skill }) {
  const Icon = skill.icon;

  return (
    <motion.li
      variants={skillReveal}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onMouseMove={trackPointer}
      className="group relative flex min-w-0 list-none items-center gap-3 overflow-hidden rounded-xl border p-3 backdrop-blur-md transition-colors duration-300 hover:border-[rgba(196,161,255,0.38)]"
      style={{
        background: GLASS.tile,
        borderColor: BRAND.border,
      }}
    >
      {/* Spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(160px circle at var(--x, 50%) var(--y, 50%), rgba(168,85,247,0.2), transparent 70%)",
        }}
      />

      {/* Icon */}
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105"
        style={{
          color: BRAND.secondary,
          background: "rgba(168,85,247,0.10)",
          borderColor: "rgba(196,161,255,0.2)",
        }}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>

      {/* Name + note */}
      <div className="relative min-w-0 flex-1">
        <p
          className="truncate text-sm font-semibold transition-colors duration-300 group-hover:text-[#C4A1FF]"
          style={{ color: BRAND.text }}
        >
          {skill.name}
        </p>
        {skill.note && (
          <p
            className="mt-0.5 truncate text-xs"
            style={{ color: BRAND.muted }}
          >
            {skill.note}
          </p>
        )}
      </div>

      {/* Indicator dot */}
      <span
        aria-hidden
        className="relative h-1.5 w-1.5 shrink-0 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: BRAND.accent,
          boxShadow: "0 0 10px rgba(232,121,249,0.5)",
        }}
      />
    </motion.li>
  );
}

// ─── Category Panel ─────────────────────────────────────

function CategoryPanel({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const meta = CATEGORY_META[category.category] ?? {
    number: String(index + 1).padStart(2, "0"),
    symbol: "#",
    subtitle: "Development technologies",
  };

  return (
    <motion.article
      variants={categoryReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(196,161,255,0.3)] sm:p-7 ${
        index === 0 ? "lg:col-span-2" : ""
      }`}
      style={{
        background: GLASS.card,
        borderColor: BRAND.border,
        boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full opacity-[0.08] blur-[85px] transition-opacity duration-500 group-hover:opacity-[0.16]"
        style={{ background: BRAND.primary }}
      />

      {/* Top gradient edge */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px opacity-70"
        style={{ background: BRAND.gradient }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-bold"
              style={{
                color: BRAND.secondary,
                background: "rgba(168,85,247,0.10)",
                borderColor: "rgba(196,161,255,0.2)",
              }}
            >
              {meta.number}
            </div>

            <div>
              <h3
                className="text-lg font-bold tracking-tight sm:text-xl"
                style={{ color: BRAND.text }}
              >
                {category.category}
              </h3>
              <p
                className="mt-1 text-xs leading-relaxed sm:text-sm"
                style={{ color: BRAND.secondaryText }}
              >
                {category.description}
              </p>
              <p
                className="mt-2 text-[11px] font-medium"
                style={{ color: BRAND.muted }}
              >
                {meta.subtitle}
              </p>
            </div>
          </div>

          <div
            aria-hidden
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl font-mono text-xl font-bold sm:flex"
            style={{
              color: "rgba(196,161,255,0.32)",
              background: "rgba(168,85,247,0.05)",
            }}
          >
            {meta.symbol}
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          className="mb-5 h-px"
          style={{
            background:
              "linear-gradient(90deg, rgba(196,161,255,0.25), transparent)",
          }}
        />

        {/* Skills */}
        <motion.ul
          variants={skillContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {category.skills.map((skill) => (
            <SkillItem key={skill.name} skill={skill} />
          ))}
        </motion.ul>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs" style={{ color: BRAND.muted }}>
            Tech stack
          </span>
          <span
            className="rounded-full border px-3 py-1 font-mono text-[11px] font-medium"
            style={{
              color: BRAND.secondary,
              borderColor: BRAND.border,
              background: "rgba(168,85,247,0.08)",
            }}
          >
            {String(category.skills.length).padStart(2, "0")} skills
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Skills Section ────────────────────────────────

export default function Skills() {
  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0
  );

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="skills"
        className="relative w-full overflow-hidden py-24 sm:py-28 lg:py-32"
        style={{ background: BRAND.background }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-0 h-[500px] w-[500px] rounded-full opacity-[0.1] blur-[140px]"
          style={{ background: BRAND.primary }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-[0.07] blur-[130px]"
          style={{ background: BRAND.accent }}
        />

        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(196,161,255,0.5) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
          {/* ─── Header ─── */}
          <motion.div
            variants={headerReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-14 grid items-end gap-10 sm:mb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
          >
            {/* Heading */}
            <div>
              <div
                className="mb-6 inline-flex items-center gap-3 text-xs font-semibold"
                style={{ color: BRAND.secondary }}
              >
                <span
                  className="h-px w-8"
                  style={{ background: BRAND.gradient }}
                />
                02 / Technical expertise
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
                Tools behind
                <br />
                the work.
              </h2>

              <p
                className="mt-6 max-w-lg text-sm leading-7 sm:text-base"
                style={{ color: BRAND.secondaryText }}
              >
                The technologies I use to design, develop and ship meaningful
                digital experiences. Every tool here is part of a learning
                journey that keeps going.
              </p>
            </div>

            {/* Toolkit panel (glass) */}
            <div
              className="relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl sm:p-7"
              style={{
                background: GLASS.panel,
                borderColor: BRAND.border,
                boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-[0.12] blur-3xl"
                style={{ background: BRAND.accent }}
              />
              <div
                aria-hidden
                className="absolute left-0 right-0 top-0 h-px opacity-70"
                style={{ background: BRAND.gradient }}
              />

              <div className="relative">
                <div className="mb-7 flex items-center justify-between">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: BRAND.muted }}
                  >
                    The toolkit
                  </span>
                  <span
                    className="rounded-full border px-3 py-1 text-[11px] font-medium"
                    style={{
                      color: BRAND.secondary,
                      borderColor: BRAND.border,
                      background: "rgba(168,85,247,0.08)",
                    }}
                  >
                    Limon Codes
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-4xl font-bold tracking-tight"
                      style={{ color: BRAND.text }}
                    >
                      {String(totalSkills).padStart(2, "0")}
                      <span style={{ color: BRAND.primary }}>+</span>
                    </p>
                    <p
                      className="mt-2 text-xs font-medium"
                      style={{ color: BRAND.muted }}
                    >
                      Technologies
                    </p>
                  </div>

                  <div
                    className="border-l pl-5"
                    style={{ borderColor: BRAND.border }}
                  >
                    <p
                      className="text-4xl font-bold tracking-tight"
                      style={{ color: BRAND.text }}
                    >
                      {String(skillCategories.length).padStart(2, "0")}
                    </p>
                    <p
                      className="mt-2 text-xs font-medium"
                      style={{ color: BRAND.muted }}
                    >
                      Categories
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden
                  className="mt-7 h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #A855F7, rgba(196,161,255,0.15), transparent)",
                  }}
                />

                <p
                  className="mt-5 text-xs leading-6"
                  style={{ color: BRAND.secondaryText }}
                >
                  From frontend interfaces to backend systems — growing with
                  every project.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── Category Bento Grid ─── */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {skillCategories.map((category, index) => (
              <CategoryPanel
                key={category.category}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}