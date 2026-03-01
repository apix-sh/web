import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { IBM_Plex_Mono } from "next/font/google";
import type { Metadata } from "next";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apix.sh"),
  title: "apix — API Explorer for Agents (and Humans)",
  description:
    "Local-first, progressive disclosure API discovery and browsing CLI for the agentic era",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={ibmPlexMono.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
