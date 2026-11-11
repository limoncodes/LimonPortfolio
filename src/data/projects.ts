// src/data/projects.ts
//
// ─────────────────────────────────────────────────────────────
//  HOW TO ADD A PROJECT
//  1. Copy any object inside the `projects` array below.
//  2. Paste it at the end (before the closing `]`).
//  3. Change the values. That's it — the Projects section updates itself.
//
//  Links are all optional:
//    liveUrl         → "Live Demo" button (shows "Coming Soon" if missing)
//    frontendGithub  → "Frontend" repo button (hidden if missing)
//    backendGithub   → "Backend" repo button (hidden if missing)
//
//  featured: true    → makes the card full width (use for 1 project)
//  image             → optional screenshot, e.g. "/projects/shop.png"
//                      (put the file in /public/projects/). If you skip it,
//                      a branded preview is generated automatically.
// ─────────────────────────────────────────────────────────────

export type ProjectCategory = "Full Stack" | "Frontend";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year?: string;
  featured?: boolean;
  description: string; // one short line
  longDescription: string; // 2–3 sentences
  technologies: string[];
  image?: string;
  liveUrl?: string;
  frontendGithub?: string;
  backendGithub?: string;
}

// ⚠️ SAMPLE DATA — replace these with your real projects.
export const projects: Project[] = [
  {
    id: "StudioSpace",
    title: "StudioSpace",
    category: "Full Stack",
    year: "2026",
    featured: true,
    description: "A Full-Stack Creative Studio Booking Marketplace",
    longDescription:
      "StudioSpace is a full-stack creative studio booking platform that connects photographers, filmmakers, podcasters, musicians, and content creators with studio owners. Users can explore creative spaces, filter studios by category, view detailed listings, and request bookings. It features secure authentication, studio listing management, booking status tracking, and separate user and host dashboards for managing reservations and monitoring earnings.",
    technologies: ["Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "shadcn/ui",
    "Better Auth"],
    image: "/projects/studiospace.png",
    liveUrl: "https://studio-space-azure.vercel.app",
    frontendGithub: "https://github.com/limoncodes/StudioSpace",
    backendGithub: "https://github.com/limoncodes/studio-space-backend",
  },
  {
    id: "BazarDor",
    title: "BazarDor",
    category: "Frontend",
    year: "2026",
    description: "A Modern Bangladesh Daily Market Price Tracking Platform",
    longDescription:
      "BazarDor is a modern and responsive web application that helps users explore and compare the prices of essential commodities across Bangladesh. Users can browse products by category, track price changes, compare minimum, maximum, and average market prices, and view detailed pricing information. It also includes user authentication and profile management for a personalized experience.",
    technologies: [ "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
    "Better Auth"],
    image: "/projects/BazarDor.png",
    liveUrl: "https://market-price-indol.vercel.app",
    frontendGithub: "https://github.com/limoncodes/Market-price",
  },
  
];