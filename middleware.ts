import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Rutas que requieren autenticación
  const protectedRoutes = ["/dashboard"];
  
  // Si el usuario intenta acceder a una ruta protegida sin estar logueado
  if (!isLoggedIn && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continuar con la request normal
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Aplicar middleware a todas las rutas del dashboard
    "/dashboard",
    "/dashboard/(.*)",
  ],
}
