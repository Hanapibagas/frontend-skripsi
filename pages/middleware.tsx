export const runtime = "experimental-edge"; //choose the runtime "nodejs" | "experimental-edge"

import { NextResponse, type NextRequest, NextMiddleware } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "../lib/session";

export async function middleware(request: NextRequest, next: NextMiddleware) {
  const path = request.nextUrl.pathname;
  const res = new Response();
  const session = await getIronSession(request, res, sessionOptions);
  const isPublic = path === "/auth";

  if (isPublic && session.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isPublic && !session.user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
