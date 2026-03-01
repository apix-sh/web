import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { LogoIcon } from "@/components/logo";

export const gitConfig = {
  user: "apix-sh",
  repo: "cli",
  branch: "main",
};

const shared: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <LogoIcon className="size-6" />
        <span className="font-bold text-lg">apix</span>
      </>
    ),
  },
  githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  themeSwitch: {
    mode: "light-dark-system",
  },
};

export function homeOptions(): BaseLayoutProps {
  return {
    ...shared,
    links: [
      { text: "Concepts", url: "/docs/concepts" },
      { text: "Docs", url: "/docs" },
    ],
  };
}

export function docsOptions(): BaseLayoutProps {
  return {
    ...shared,
    links: [{ text: "Home", url: "/" }],
  };
}
