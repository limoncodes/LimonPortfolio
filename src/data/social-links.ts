export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  username: string;
}

// contactInfo must stay above socialLinks because the Email href uses it
export const contactInfo = {
  email: "limonislam9901@gmail.com", // put your real email here
  resumeUrl: "/resume.pdf",
};

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/limoncodes",
    icon: "github",
    username: "limoncodes",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1FubgzzTnw/",
    icon: "facebook",
    username: "limonislam",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/limoncodes",
    icon: "linkedin",
    username: "limonislam",
  },
  {
    label: "Email",
    // Click opens the default mail app with the subject already filled in
    href: `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      "Project Inquiry"
    )}`,
    icon: "email",
    username: contactInfo.email,
  },
];