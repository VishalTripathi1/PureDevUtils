import { NextRequest } from "next/server";
import { getSitemapXml } from "@/lib/seo";

export const dynamic = "force-static";

export function GET(_request: NextRequest) {
  return new Response(getSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
