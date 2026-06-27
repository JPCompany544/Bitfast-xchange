import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require the user to be logged in
const PROTECTED_ROUTES = ["/buy-crypto", "/sell-crypto", "/p2p", "/dashboard", "/admin"];
// Routes only for unauthenticated users (redirect to home if already logged in)
const AUTH_ROUTES = ["/signup", "/login"];

export async function middleware(request: NextRequest) {
  // If env vars are missing, skip auth checks entirely — don't break the site
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Refresh session — IMPORTANT: do not remove this
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // Redirect unauthenticated users away from protected routes
    const isProtected = PROTECTED_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtected && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/signup";
      return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from auth routes
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      pathname.startsWith(route)
    );
    if (isAuthRoute && user) {
      // Check if the user is an admin to route them properly
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const url = request.nextUrl.clone();
      url.pathname = profile?.role === "admin" ? "/admin" : "/buy-crypto";
      return NextResponse.redirect(url);
    }
  } catch {
    // If anything goes wrong with Supabase, just serve the page normally
    return NextResponse.next();
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm)$).*)",
  ],
};
