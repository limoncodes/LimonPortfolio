"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { projects, Project } from "@/data/projects";

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

const MAX_TECH = 5;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[#C4A1FF]/70";

// Inline GitHub SVG icon (lucide-react removed brand icons)
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Helpers ────────────────────────────────────────────

function getHost(url?: string): string {
  if (!url) return "coming soon";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "coming soon";
  }
}

// Brand-only glow positions so every cover feels different
const coverGlows = [
  { a: "15% 0%", b: "90% 100%" },
  { a: "85% 0%", b: "10% 100%" },
  { a: "50% 100%", b: "50% 0%" },
  { a: "0% 100%", b: "100% 0%" },
];

// ─── Project Cover (preview area) ───────────────────────

function ProjectCover({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured: boolean;
}) {
  const glow = coverGlows[index % coverGlows.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        featured
          ? "h-[240px] sm:h-[280px] lg:h-auto lg:min-h-[360px]"
          : "h-[210px]"
      }`}
      style={{
        background: `radial-gradient(70% 90% at ${glow.a}, rgba(168,85,247,0.45), transparent 70%), radial-gradient(60% 80% at ${glow.b}, rgba(232,121,249,0.22), transparent 70%), linear-gradient(160deg, ${BRAND.surface} 0%, ${BRAND.background} 100%)`,
      }}
    >
      {project.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,7,11,0) 40%, rgba(9,7,11,0.85) 100%)",
            }}
          />
        </>
      ) : (
        <>
          {/* Dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(196,161,255,0.22) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(70% 70% at 50% 50%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 50%, #000 30%, transparent 100%)",
            }}
          />

          {/* Browser window mock */}
          <div
            className="relative z-10 w-[78%] max-w-[340px] overflow-hidden rounded-xl border transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{
              background: "rgba(9,7,11,0.6)",
              borderColor: BRAND.border,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="flex items-center gap-3 border-b px-3 py-2"
              style={{ borderColor: BRAND.border }}
            >
              <div className="flex gap-1.5">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-2 w-2 rounded-full"
                    style={{ background: "rgba(196,161,255,0.28)" }}
                  />
                ))}
              </div>

              <span
                className="flex-1 truncate rounded-full px-3 py-0.5 text-center text-[10px] font-medium"
                style={{
                  background: "rgba(196,161,255,0.08)",
                  color: BRAND.muted,
                }}
              >
                {getHost(project.liveUrl)}
              </span>
            </div>

            <div className="px-4 pb-5 pt-4 text-left">
              <p
                className="bg-clip-text text-xl font-black leading-tight tracking-[-0.03em] text-transparent sm:text-2xl"
                style={{ backgroundImage: BRAND.gradient }}
              >
                {project.title}
              </p>

              <div className="mt-3 space-y-1.5">
                <div
                  className="h-1.5 w-full rounded-full"
                  style={{ background: "rgba(196,161,255,0.12)" }}
                />
                <div
                  className="h-1.5 w-4/5 rounded-full"
                  style={{ background: "rgba(196,161,255,0.12)" }}
                />
                <div
                  className="h-1.5 w-3/5 rounded-full"
                  style={{ background: "rgba(196,161,255,0.08)" }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom shimmer line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(196,161,255,0.4), transparent)",
        }}
      />
    </div>
  );
}

// ─── Action Buttons ─────────────────────────────────────

function ProjectLinks({ project }: { project: Project }) {
  const outlineBtn = `flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200 hover:border-[rgba(168,85,247,0.6)] hover:bg-[rgba(168,85,247,0.12)] hover:text-[#F5F0FA] ${focusRing}`;
  const outlineStyle = {
    color: BRAND.secondary,
    borderColor: "rgba(196,161,255,0.3)",
    background: "rgba(196,161,255,0.05)",
  };

  return (
    <div className="flex flex-wrap gap-2.5">
      {/* Live demo */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/live relative flex min-w-[140px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[13px] font-bold transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.45)] ${focusRing}`}
          style={{
            background: BRAND.gradient,
            color: BRAND.background,
            boxShadow: "0 5px 22px rgba(168,85,247,0.25)",
          }}
        >
          Live Demo
          <ArrowUpRight
            size={15}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
          />
        </a>
      ) : (
        <button
          disabled
          aria-label="Live demo coming soon"
          className="flex min-w-[140px] flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-semibold"
          style={{
            color: BRAND.muted,
            borderColor: BRAND.border,
            background: "rgba(196,161,255,0.04)",
          }}
        >
          Coming Soon
        </button>
      )}

      {/* Frontend repo */}
      {project.frontendGithub && (
        <a
          href={project.frontendGithub}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} frontend repository`}
          className={outlineBtn}
          style={outlineStyle}
        >
          <GithubIcon size={14} />
          Frontend
        </a>
      )}

      {/* Backend repo (for full stack projects) */}
      {project.backendGithub && (
        <a
          href={project.backendGithub}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} backend repository`}
          className={outlineBtn}
          style={outlineStyle}
        >
          <GithubIcon size={14} />
          Backend
        </a>
      )}
    </div>
  );
}

// ─── Single Project Card ────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const featured = !!project.featured;

  const visibleTech = project.technologies.slice(0, MAX_TECH);
  const extraTech = project.technologies.length - visibleTech.length;

  return (
    <motion.article
      layout="position"
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: reduceMotion ? 0 : (index % 2) * 0.1,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              borderColor: "rgba(168,85,247,0.5)",
              transition: { duration: 0.25 },
            }
      }
      className={`group relative flex flex-col overflow-hidden rounded-3xl border ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.05fr_1fr]" : ""
      }`}
      style={{
        background: "rgba(22,17,28,0.75)",
        borderColor: BRAND.border,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,240,250,0.04)",
      }}
    >
      <ProjectCover project={project} index={index} featured={featured} />

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
            style={{
              color: BRAND.secondary,
              borderColor: "rgba(196,161,255,0.25)",
              background: "rgba(168,85,247,0.1)",
            }}
          >
            <Layers size={11} />
            {project.category}
          </span>

          {project.year && (
            <span
              className="text-xs font-medium"
              style={{ color: BRAND.muted }}
            >
              {project.year}
            </span>
          )}
        </div>

        {/* Title + short description */}
        <div>
          <h3
            className={`font-black tracking-[-0.02em] ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
            style={{ color: BRAND.text }}
          >
            {project.title}
          </h3>

          <p
            className="mt-1.5 text-sm font-medium"
            style={{ color: BRAND.secondary }}
          >
            {project.description}
          </p>
        </div>

        {/* Long description */}
        <p
          className={`flex-1 text-sm leading-relaxed ${
            featured ? "" : "line-clamp-3"
          }`}
          style={{ color: BRAND.secondaryText }}
        >
          {project.longDescription}
        </p>

        {/* Tech badges */}
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-2.5 py-1 text-xs font-medium"
              style={{
                color: BRAND.secondary,
                borderColor: "rgba(196,161,255,0.25)",
                background: "rgba(168,85,247,0.08)",
              }}
            >
              {tech}
            </li>
          ))}

          {extraTech > 0 && (
            <li
              className="rounded-full border px-2.5 py-1 text-xs font-medium"
              style={{
                color: BRAND.muted,
                borderColor: BRAND.border,
              }}
            >
              +{extraTech}
            </li>
          )}
        </ul>

        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
}

// ─── Main Section ───────────────────────────────────────

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const visibleProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const headingVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  } as const;

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
      style={{ background: BRAND.background }}
    >
      {/* ── Background ambient glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #A855F7, transparent)",
          opacity: 0.14,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, #E879F9, transparent)",
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          className="mb-12 text-center sm:mb-14"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headingVariants}
        >
          <div className="mb-6 inline-flex items-center gap-2">
            <span
              className="rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
              style={{
                color: BRAND.secondary,
                borderColor: "rgba(196,161,255,0.25)",
                background: "rgba(168,85,247,0.1)",
              }}
            >
              Featured Projects
            </span>
          </div>

          <h2
            className="text-4xl font-black leading-tight sm:text-5xl"
            style={{ color: BRAND.text }}
          >
            What I&apos;ve{" "}
            <span
              className="inline-block bg-clip-text text-transparent"
              style={{ backgroundImage: BRAND.gradient }}
            >
              Built
            </span>
          </h2>

          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: BRAND.secondaryText }}
          >
            A curated selection of projects that showcase my technical depth and
            design sensibility.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(196,161,255,0.4))",
              }}
            />
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: BRAND.primary }}
            />
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, rgba(196,161,255,0.4), transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* ── Category filter (only when there is more than one category) ── */}
        {categories.length > 2 && (
          <div className="mb-10 flex justify-center">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex max-w-full flex-wrap items-center justify-center gap-0.5 rounded-full border p-1"
              style={{
                borderColor: BRAND.border,
                background: "rgba(22,17,28,0.7)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
            >
              {categories.map((category) => {
                const isActive = filter === category;

                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(category)}
                    className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 hover:text-[#F5F0FA] ${focusRing}`}
                    style={{
                      color: isActive ? BRAND.text : BRAND.secondaryText,
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="projects-filter"
                        className="absolute inset-0 rounded-full border"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(168,85,247,0.32), rgba(168,85,247,0.14))",
                          borderColor: "rgba(196,161,255,0.3)",
                          boxShadow:
                            "0 0 24px rgba(168,85,247,0.25), inset 0 1px 0 rgba(245,240,250,0.1)",
                        }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}

                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Project grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}