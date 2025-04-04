import { NextResponse } from "next/server";

export function middleware() {
  // Ottieni la risposta originale
  const response = NextResponse.next();

  // Aggiungi header per prevenire l'aggiunta di attributi non standard
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  return response;
}

// Configura il middleware per essere eseguito solo su determinate route
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
