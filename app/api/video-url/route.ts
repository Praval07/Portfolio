import { NextRequest, NextResponse } from "next/server";

// ─── OneDrive sharing URLs ────────────────────────────────────────────────────
const SHARE_URLS = {
  hero: "https://1drv.ms/v/c/97627625100c5a0f/IQCDb-74EBYKTIWw8Vlw-2I2AeTBaxVBJomXJTJ7aj_FZfg?e=Pvvvaf",
  gallery:
    "https://1drv.ms/v/c/97627625100c5a0f/IQAgvAnAeCUDS75jXpBu6B5UAQDs8fIinZ2fDp9acJ5aODI?e=DlYJe0",
} as const;

type VideoKey = keyof typeof SHARE_URLS;

/**
 * Convert a OneDrive sharing URL to the base64url token required by the
 * public OneDrive API: https://api.onedrive.com/v1.0/shares/{token}/driveItem
 * This endpoint works without OAuth for publicly-shared files.
 */
function toShareToken(shareUrl: string): string {
  const b64 = Buffer.from(shareUrl)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `u!${b64}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key") as VideoKey | null;

  if (!key || !(key in SHARE_URLS)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  try {
    const token = toShareToken(SHARE_URLS[key]);
    const apiUrl = `https://api.onedrive.com/v1.0/shares/${token}/driveItem`;

    const res = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
      // Cache on Vercel Edge for 45 min — OneDrive download URLs typically
      // last several hours, so this is safe while reducing API chatter.
      next: { revalidate: 2700 },
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`OneDrive API ${res.status}: ${body.slice(0, 200)}`);
    }

    const data = await res.json();

    // "@content.downloadUrl" is the direct, range-request-capable stream URL
    const downloadUrl: string | undefined = data["@content.downloadUrl"];

    if (!downloadUrl) {
      throw new Error("No @content.downloadUrl in OneDrive response");
    }

    return NextResponse.json(
      { url: downloadUrl },
      {
        headers: {
          // Allow CDN / browser to cache for 40 min
          "Cache-Control": "public, max-age=2400, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // Ignored in production
    return NextResponse.json(
      { error: "Failed to resolve video URL", detail: message },
      { status: 502 }
    );
  }
}
