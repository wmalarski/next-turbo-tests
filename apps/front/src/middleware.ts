import { paths } from "@utils/paths";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith(paths.posts)) {
    const authCookie = request.cookies.get("next-auth.session-token");
    if (!authCookie) {
      return NextResponse.redirect(new URL(paths.signIn, request.url));
    }
  }
};

export const config = {
  matcher: paths.posts,
};
