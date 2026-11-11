"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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

// ─── Navigation Links ───────────────────────────────────

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// ─── Smooth Scroll ───────────────────────────────────────

function scrollTo(href: string, reduceMotion: boolean) {
  const id = href.replace("#", "");
  const element = document.getElementById(id);

  element?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

// ─── Navbar Component ───────────────────────────────────

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // ─── Scroll Detection ────────────────────────────────

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let currentSection = "home";

      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);

        if (element && element.getBoundingClientRect().top <= 140) {
          currentSection = id;
        }
      }

      // Last section can be too short to reach the trigger line
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        currentSection = navLinks[navLinks.length - 1].href.replace("#", "");
      }

      setActive(currentSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Mobile Menu: lock scroll, Escape, auto-close on desktop ───

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  // ─── Navigation Handler ──────────────────────────────

  const handleNav = (href: string) => {
    setIsOpen(false);
    scrollTo(href, !!reduceMotion);
  };

  const focusRing =
    "outline-none focus-visible:ring-2 focus-visible:ring-[#C4A1FF]/70";

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  return (
    <>
      {/* ═════════ MOBILE BACKDROP ═════════ */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 z-40 lg:hidden"
            style={{
              background: "rgba(9,7,11,0.72)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <div className="mx-auto max-w-6xl">
          {/* ═════════ MAIN BAR ═════════ */}

          <nav
            aria-label="Main navigation"
            className={`pointer-events-auto relative flex items-center justify-between gap-4 overflow-hidden rounded-full border pl-2.5 pr-2 transition-[height,background-color,box-shadow] duration-500 ease-out sm:pl-3 sm:pr-2.5 ${
              scrolled ? "h-[60px]" : "h-[68px]"
            }`}
            style={{
              backgroundColor: scrolled
                ? "rgba(22,17,28,0.78)"
                : "rgba(22,17,28,0.45)",
              backdropFilter: "blur(24px) saturate(150%)",
              WebkitBackdropFilter: "blur(24px) saturate(150%)",
              borderColor: BRAND.border,
              boxShadow: scrolled
                ? "0 16px 48px rgba(0,0,0,0.45), 0 0 40px rgba(168,85,247,0.08), inset 0 1px 0 rgba(245,240,250,0.06)"
                : "0 8px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(245,240,250,0.05)",
            }}
          >
            {/* Top edge highlight */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(196,161,255,0.7), transparent)",
              }}
            />

            {/* Ambient glow */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 left-1/2 h-24 w-1/2 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,85,247,0.2), transparent)",
              }}
            />

            {/* ═════════ BRAND LOGO ═════════ */}

            <button
              onClick={() => handleNav("#home")}
              aria-label="Limon Codes - Home"
              className={`group relative z-10 flex shrink-0 items-center rounded-full px-3 py-1.5 ${focusRing}`}
            >
              <span className="flex items-baseline leading-none">
                <span
                  className="text-[23px] font-black tracking-[-0.06em] sm:text-[27px]"
                  style={{ color: BRAND.text }}
                >
                  Limon
                </span>

                <span
                  className="bg-clip-text pl-1.5 pr-1 text-[23px] font-black italic tracking-[-0.06em] text-transparent transition-[filter] duration-300 group-hover:brightness-125 sm:text-[27px]"
                  style={{ backgroundImage: BRAND.gradient }}
                >
                  Codes
                </span>
              </span>
            </button>

            {/* ═════════ DESKTOP NAVIGATION ═════════ */}

            <ul
              className="relative z-10 hidden items-center gap-0.5 rounded-full border p-1 lg:flex"
              style={{
                borderColor: BRAND.border,
                background: "rgba(9,7,11,0.5)",
                boxShadow: "inset 0 1px 6px rgba(0,0,0,0.35)",
              }}
              onMouseLeave={() => setHovered(null)}
            >
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                const isHovered = hovered === id && !isActive;

                return (
                  <li key={link.label} className="relative">
                    <button
                      onClick={() => handleNav(link.href)}
                      onMouseEnter={() => setHovered(id)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${focusRing}`}
                      style={{
                        color: isActive
                          ? BRAND.text
                          : isHovered
                          ? BRAND.text
                          : BRAND.secondaryText,
                      }}
                    >
                      {/* Hover spotlight */}

                      {isHovered && (
                        <motion.span
                          layoutId="hover-nav"
                          className="absolute inset-0 rounded-full"
                          style={{ background: "rgba(196,161,255,0.08)" }}
                          transition={spring}
                        />
                      )}

                      {/* Active pill */}

                      {isActive && (
                        <motion.span
                          layoutId="active-nav"
                          className="absolute inset-0 rounded-full border"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(168,85,247,0.32), rgba(168,85,247,0.14))",
                            borderColor: "rgba(196,161,255,0.3)",
                            boxShadow:
                              "0 0 24px rgba(168,85,247,0.28), inset 0 1px 0 rgba(245,240,250,0.12)",
                          }}
                          transition={spring}
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* ═════════ HIRE ME BUTTON ═════════ */}

            <div className="relative z-10 hidden lg:block">
              <motion.button
                onClick={() => handleNav("#contact")}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-[13.5px] font-bold transition-shadow duration-300 hover:shadow-[0_8px_34px_rgba(168,85,247,0.5)] ${focusRing}`}
                style={{
                  background: BRAND.gradient,
                  color: BRAND.background,
                  boxShadow: "0 6px 26px rgba(168,85,247,0.28)",
                }}
              >
                {/* Shine sweep */}

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 -translate-x-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-[320%] group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(245,240,250,0.45), transparent)",
                  }}
                />

                <span className="relative">Hire Me</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.button>
            </div>

            {/* ═════════ MOBILE MENU BUTTON ═════════ */}

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 hover:bg-[#A855F7]/15 lg:hidden ${focusRing}`}
              style={{
                borderColor: BRAND.border,
                color: BRAND.secondary,
                background: "rgba(168,85,247,0.08)",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "menu"}
                  initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* ═════════ SCROLL PROGRESS ═════════ */}

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-0 h-[2px] origin-left rounded-full"
              style={{
                scaleX: reduceMotion ? scrollYProgress : progress,
                background: BRAND.gradient,
                opacity: scrolled ? 0.95 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          </nav>

          {/* ═════════ MOBILE NAVIGATION ═════════ */}

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id="mobile-navigation"
                initial={
                  reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto relative mt-2 origin-top overflow-hidden rounded-[28px] border lg:hidden"
                style={{
                  background: "rgba(22,17,28,0.94)",
                  borderColor: BRAND.border,
                  backdropFilter: "blur(24px) saturate(140%)",
                  WebkitBackdropFilter: "blur(24px) saturate(140%)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(168,85,247,0.22), transparent)",
                  }}
                />

                <div className="relative p-3">
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((link, index) => {
                      const isActive = active === link.href.replace("#", "");

                      return (
                        <motion.li
                          key={link.label}
                          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: reduceMotion ? 0 : index * 0.035,
                          }}
                        >
                          <button
                            onClick={() => handleNav(link.href)}
                            aria-current={isActive ? "location" : undefined}
                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors duration-300 ${focusRing}`}
                            style={{
                              color: isActive
                                ? BRAND.text
                                : BRAND.secondaryText,
                              background: isActive
                                ? "linear-gradient(90deg, rgba(168,85,247,0.2), rgba(168,85,247,0.04))"
                                : "transparent",
                              border: `1px solid ${
                                isActive
                                  ? "rgba(196,161,255,0.2)"
                                  : "transparent"
                              }`,
                            }}
                          >
                            <span>{link.label}</span>

                            {isActive && (
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{
                                  background: BRAND.accent,
                                  boxShadow: "0 0 10px rgba(232,121,249,0.7)",
                                }}
                              />
                            )}
                          </button>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <motion.button
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: reduceMotion ? 0 : 0.25,
                    }}
                    onClick={() => handleNav("#contact")}
                    className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold ${focusRing}`}
                    style={{
                      background: BRAND.gradient,
                      color: BRAND.background,
                      boxShadow: "0 8px 28px rgba(168,85,247,0.28)",
                    }}
                  >
                    Hire Me
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </motion.button>

                  <p
                    className="mt-3 pb-1 text-center text-xs font-medium tracking-wide"
                    style={{ color: BRAND.muted }}
                  >
                    Limon Codes · Developer Portfolio
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}