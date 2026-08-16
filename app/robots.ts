import { NextRequest } from "next/server";
import { getRobotsTxt } from "@/lib/seo";

export const dynamic = "force-static";

export function GET(_request: NextRequest) {
  return new Response(getRobotsTxt(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
