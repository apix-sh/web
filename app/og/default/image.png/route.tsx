import { ImageResponse } from "next/og";
import { generateDefault, getImageResponseOptions } from "@/lib/og";

export const revalidate = false;

export async function GET() {
  const [options, element] = await Promise.all([
    getImageResponseOptions(),
    generateDefault(),
  ]);

  return new ImageResponse(element, options);
}
