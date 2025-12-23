// src/proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "@/lib/supabase/proxy";
import {
  publicRoutes,
  REDIRECT_WHEN_AUTHENTICATED,
  REDIRECT_WHEN_NOT_AUTHENTICATED,
} from "@/lib/auth/route-config";
import { matchRoute } from "@/lib/auth/route-matcher";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1️⃣ Atualiza sessão
  let response = await updateSession(request);

  // 2️⃣ Supabase SSR client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach((c) =>
            response.cookies.set(c.name, c.value, c.options)
          );
        },
      },
    }
  );

  // 3️⃣ Verifica usuário
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 USER NO MIDDLEWARE:", user);
  console.log("🍪 COOKIES:", request.cookies.getAll());
  console.log("📍 PATH:", pathname);

  const publicRoute = publicRoutes.find((route) => matchRoute(pathname, route));

  // 🔒 NÃO logado em rota privada
  if (!user && !publicRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED, request.url)
    );
  }

  // 🚫 LOGADO em rota pública proibida
  if (user && publicRoute?.whenAuthenticated === "redirect") {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_AUTHENTICATED, request.url)
    );
  }

  // ✅ permitido
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
