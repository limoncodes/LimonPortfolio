
"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// OFFICIAL BRAND COLORS FROM HERO
const C = {
  bg: "#09070B",
  primary: "#A855F7",
  secondary: "#C4A1FF",
  accent: "#E879F9",
  text: "#F5F0FA",
  textSub: "#A9A0B2",
  muted: "#777080",
  border: "rgba(196,161,255,0.14)",
  card: "rgba(255,255,255,0.025)",
};

// ANIMATION
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -25,
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

// ABOUT INFORMATION
const infoCards = [
  {
    number: "01",
    emoji: "🎓",
    title: "Diploma Student",
    subtitle: "Image Polytechnic Institute",
  },
  {
    number: "02",
    emoji: "💻",
    title: "Frontend Developer",
    subtitle: "React & Next.js",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Full-Stack Journey",
    subtitle: "Learning Backend Development",
  },
];

// WHAT DRIVES ME
const drivePoints = [
  "Building clean, responsive and user-friendly interfaces.",
  "Solving real-world problems through practical projects.",
  "Continuously learning and improving my development skills.",
];

// ABOUT PARAGRAPHS
const paragraphs = [
  "My journey into web development started with HTML and CSS. What began as curiosity gradually became a passion for creating modern and interactive web experiences.",
  "I'm currently a Diploma student at Image Polytechnic Institute. Alongside my studies, I spend time learning React, Next.js, TypeScript and building practical projects.",
  "I'm also exploring backend development with Node.js, Express.js and MongoDB. My goal is to become a professional full-stack developer and build useful digital products.",
];

// COMPONENT
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-80px",
  });

  const reduceMotion = useReducedMotion();

  const animationState =
    isInView || reduceMotion ? "visible" : "hidden";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden py-24 text-white md:py-32"
      style={{ backgroundColor: C.bg }}
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{
          backgroundColor: `${C.primary}18`,
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[400px] w-[400px] rounded-full blur-[130px]"
        style={{
          backgroundColor: `${C.accent}12`,
        }}
      />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">

        {/* SECTION HEADER */}
        <div className="mb-14 md:mb-20">

          {/* Section Badge */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate={animationState}
            custom={0}
            className="mb-7 flex justify-center md:justify-start"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{
                color: C.secondary,
                backgroundColor: `${C.primary}12`,
                border: `1px solid ${C.border}`,
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: C.primary,
                  boxShadow: `0 0 10px ${C.primary}`,
                }}
              />

              About Me
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate={animationState}
            custom={1}
            className="max-w-3xl text-center text-3xl font-bold leading-tight tracking-tight md:text-left md:text-5xl lg:text-6xl"
            style={{ color: C.text }}
          >
            A little about my

            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${C.primary}, ${C.secondary}, ${C.accent})`,
              }}
            >
              Journey & Passion.
            </span>
          </motion.h2>

          {/* Short Description */}
          <motion.p
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate={animationState}
            custom={2}
            className="mx-auto mt-5 max-w-xl text-center text-sm leading-7 md:mx-0 md:text-left md:text-base"
            style={{ color: C.textSub }}
          >
            A curious developer, a continuous learner and someone who
            enjoys turning creative ideas into functional experiences.
          </motion.p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-4 lg:col-span-2">

            {/* Small Heading */}
            <motion.div
              variants={fadeLeft}
              initial={reduceMotion ? false : "hidden"}
              animate={animationState}
              custom={2}
              className="mb-2 flex items-center justify-between"
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: C.secondary }}
              >
                Who I Am
              </p>

              <span
                className="text-xs"
                style={{ color: C.muted }}
              >
                01 — 03
              </span>
            </motion.div>

            {/* Information Cards */}
            {infoCards.map((card, i) => (
              <motion.div
                key={card.number}
                variants={fadeLeft}
                initial={reduceMotion ? false : "hidden"}
                animate={animationState}
                custom={i + 3}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -4, x: 3 }
                }
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-300"
                style={{
                  backgroundColor: C.card,
                  borderColor: C.border,
                }}
              >
                {/* Hover Background Glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(110deg, ${C.primary}12, transparent 65%)`,
                  }}
                />

                {/* Number */}
                <span
                  className="absolute right-4 top-3 text-[10px] font-mono"
                  style={{ color: C.muted }}
                >
                  {card.number}
                </span>

                {/* Icon */}
                <div
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${C.primary}15`,
                    border: `1px solid ${C.border}`,
                  }}
                >
                  {card.emoji}
                </div>

                {/* Card Content */}
                <div className="relative min-w-0">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: C.text }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: C.textSub }}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="relative ml-auto text-lg opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  style={{ color: C.secondary }}
                >
                  ↗
                </span>
              </motion.div>
            ))}

            {/* Technology Focus Card */}
            <motion.div
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate={animationState}
              custom={7}
              className="mt-2 rounded-2xl border p-5"
              style={{
                background: `linear-gradient(135deg, ${C.primary}16, ${C.accent}08)`,
                borderColor: C.border,
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: C.secondary }}
              >
                Current Focus
              </p>

              <p
                className="mt-3 text-lg font-bold"
                style={{ color: C.text }}
              >
                Frontend to Full-Stack
              </p>

              <p
                className="mt-2 text-xs leading-6"
                style={{ color: C.textSub }}
              >
                Exploring modern frontend tools and growing my
                backend development skills.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-6 lg:col-span-3">

            {/* About Content */}
            <motion.div
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate={animationState}
              custom={3}
              className="relative rounded-3xl border p-6 sm:p-8"
              style={{
                backgroundColor: C.card,
                borderColor: C.border,
              }}
            >
              {/* Decorative Quote */}
              <span
                className="absolute right-6 top-3 font-serif text-6xl leading-none opacity-20"
                style={{ color: C.secondary }}
                aria-hidden="true"
              >
                “
              </span>

              <p
                className="mb-6 text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: C.secondary }}
              >
                My Story
              </p>

              <div className="relative flex flex-col gap-5">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 15 }
                    }
                    animate={
                      animationState === "visible"
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 15 }
                    }
                    transition={{
                      duration: 0.55,
                      delay: reduceMotion
                        ? 0
                        : 0.4 + index * 0.15,
                    }}
                    className="text-sm leading-8 md:text-[15px]"
                    style={{ color: C.textSub }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Bottom Accent */}
              <div
                className="mt-7 h-[2px] w-20 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
                }}
              />
            </motion.div>

            {/* WHAT DRIVES ME */}
            <motion.div
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate={animationState}
              custom={6}
              className="rounded-3xl border p-6 sm:p-8"
              style={{
                backgroundColor: C.card,
                borderColor: C.border,
              }}
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: C.secondary }}
                  >
                    What Drives Me
                  </p>

                  <h3
                    className="mt-2 text-xl font-bold"
                    style={{ color: C.text }}
                  >
                    Always creating. Always learning.
                  </h3>
                </div>

                <div
                  className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:flex"
                  style={{
                    backgroundColor: `${C.primary}18`,
                    color: C.secondary,
                  }}
                >
                  <span className="text-2xl">✦</span>
                </div>
              </div>

              <ul className="flex flex-col gap-4">
                {drivePoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, x: -12 }
                    }
                    animate={
                      animationState === "visible"
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -12 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion
                        ? 0
                        : 0.7 + i * 0.12,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: C.primary,
                        boxShadow: `0 0 8px ${C.primary}`,
                      }}
                    />

                    <span
                      className="text-sm leading-7"
                      style={{ color: C.textSub }}
                    >
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

      
      </div>
    </section>
  );
}
