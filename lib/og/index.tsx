import path from "node:path";
import fs from "node:fs/promises";
import type { ReactNode } from "react";
import type { ImageResponseOptions } from "next/server";
import { LogoIcon } from "@/components/logo";

export interface GenerateProps {
  title: ReactNode;
  description?: ReactNode;
}

const dir = path.join(process.cwd(), "lib/og");
const font = fs.readFile(path.join(dir, "IBMPlexMono-Regular.ttf"));
const fontBold = fs.readFile(path.join(dir, "IBMPlexMono-Bold.ttf"));
const bgImage = fs.readFile(path.join(dir, "bg.png"));

async function getBgSrc() {
  const buf = await bgImage;
  const base64 = Buffer.from(buf).toString("base64");
  return `data:image/png;base64,${base64}`;
}

export async function getImageResponseOptions(): Promise<ImageResponseOptions> {
  return {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Mono",
        data: await font,
        weight: 400,
      },
      {
        name: "Mono",
        data: await fontBold,
        weight: 600,
      },
    ],
  };
}

export async function generate({ title, description }: GenerateProps) {
  const primaryTextColor = "rgb(240,240,240)";
  const bgSrc = await getBgSrc();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "rgb(10,10,10)",
        fontFamily: "Mono",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "6rem",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "64px",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "32px",
            color: "rgba(240,240,240,0.7)",
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
            color: primaryTextColor,
          }}
        >
          <LogoIcon height={48} width={48} />
          <p
            style={{
              fontSize: "46px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "24px",
            }}
          >
            <span style={{ transform: "translateY(-4px)" }}>apix</span>
            <span
              style={{
                fontWeight: 400,
                fontSize: 28,
                color: "rgba(240,240,240,0.7)",
              }}
            >
              {" "}
              — API Explorer for Agents (and Humans)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateDefault() {
  const bgSrc = await getBgSrc();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "rgb(10,10,10)",
        fontFamily: "Mono",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <LogoIcon height={72} width={72} />
        <p
          style={{
            fontSize: "72px",
            fontWeight: 600,
            transform: "translateY(-4px)",
          }}
        >
          apix
        </p>
      </div>
      <p
        style={{
          fontSize: "28px",
          fontWeight: 400,
          color: "rgba(240,240,240,0.7)",
          marginTop: "16px",
        }}
      >
        API Explorer for Agents (and Humans)
      </p>
    </div>
  );
}
