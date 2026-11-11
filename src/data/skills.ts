// data/skills.ts
// ─────────────────────────────────────────────────────────
// নতুন skill add করতে:
//   1. উপরে react-icons থেকে icon import করো
//   2. যে category-তে চাও তার `skills` array-তে একটা line যোগ করো
//
//   import { SiPrisma } from "react-icons/si";
//   { name: "Prisma", icon: SiPrisma, note: "Database ORM" }
//
// Icon খুঁজতে: https://react-icons.github.io/react-icons
// ─────────────────────────────────────────────────────────

import type { IconType } from "react-icons";
import { FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

export type Skill = {
  name: string;
  icon: IconType;
  note?: string;
};

export type SkillCategory = {
  category: string;
  description: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    description: "Interfaces that are fast, responsive and easy to use.",
    skills: [
      { name: "HTML", icon: FaHtml5, note: "Semantic markup" },
      { name: "CSS", icon: FaCss3Alt, note: "Layouts & animation" },
      { name: "JavaScript", icon: SiJavascript, note: "Everyday language" },
      { name: "TypeScript", icon: SiTypescript, note: "Typed JavaScript" },
      { name: "React", icon: SiReact, note: "UI components" },
      { name: "Next.js", icon: SiNextdotjs, note: "Full-stack React" },
      { name: "Tailwind CSS", icon: SiTailwindcss, note: "Utility-first styling" },
    ],
  },
  {
    category: "Backend",
    description: "APIs, data and authentication behind the screen.",
    skills: [
      { name: "Node.js", icon: FaNodeJs, note: "JavaScript runtime" },
      { name: "Express.js", icon: SiExpress, note: "REST APIs" },
      { name: "MongoDB", icon: SiMongodb, note: "NoSQL database" },
      { name: "Better Auth", icon: FiShield, note: "Authentication" },
    ],
  },
  {
    category: "Tools & Platforms",
    description: "What I use to build, version and ship.",
    skills: [
      { name: "Git", icon: SiGit, note: "Version control" },
      { name: "GitHub", icon: SiGithub, note: "Code hosting" },
      { name: "VS Code", icon: VscVscode, note: "Code editor" },
      { name: "Vercel", icon: SiVercel, note: "Deployment" },
    ],
  },
];