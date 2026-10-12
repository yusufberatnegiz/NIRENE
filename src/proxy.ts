import { NextResponse, type NextRequest } from "next/server";
import tr from "./dictionaries/tr.json";

const locales = ["tr", "en"];
const agentSlugs = new Set(tr.agents.map((a) => a.slug));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, lang, section, slug, ...rest] = pathname.split("/");

  if (locales.includes(lang)) {
    // notFound() inside a streamed page keeps a 200 status, so unknown agents are rejected before rendering.
    if (section === "agents" && slug && (!agentSlugs.has(slug) || rest.length)) {
      return NextResponse.rewrite(new URL(`/${lang}/__not-found`, request.url));
    }
    return;
  }

  const preferred = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const locale = preferred.startsWith("en") ? "en" : "tr";
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icon|apple-icon|opengraph-image|robots.txt|sitemap.xml|.*\\..*).*)"],
};
