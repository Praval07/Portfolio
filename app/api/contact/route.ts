import { NextResponse } from "next/server";

/**
 * PLACEHOLDER contact endpoint. This currently validates input and
 * returns success without actually sending anything anywhere — it
 * exists so the frontend form has something to talk to.
 *
 * Before launch, wire this up to a real provider, e.g.:
 *   - Resend (https://resend.com) — simplest for a solo portfolio
 *   - SendGrid / Postmark
 *   - A serverless function that writes to a DB + sends a notification
 *
 * Also add basic rate limiting and spam protection (e.g. a honeypot
 * field or hCaptcha) before this is publicly reachable — see the
 * Security section of the engineering bible (Part 8 §17).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as { name?: string; email?: string; message?: string };

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: send email / persist submission here.
    console.log("Contact form submission (not yet wired to a real provider):", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
