import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import { getToken } from "next-auth/jwt"

const SECRET = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl

  const isPublicPath = ['/', '/signin', '/signup', '/api/auth'].includes(pathname)
  const isProtectedPath = pathname.startsWith('/resumes')

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  const token = await getToken({req, secret: SECRET})
  console.log('Middleware: Token de sesión:', token ? 'Existe' : 'No existe')

  if (isProtectedPath && !token) {
    console.log(`Middleware: Acceso denegado a ${pathname}, redirigiendo a /signin`);
    const url = new URL('/signin', req.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url);
  }

  // evitamos que usuario que tienen token vean la pagina de signin y signup
  if (isPublicPath && token) {
    if (pathname !== '/resumes') {
      console.log(`Middleware: Usuario autenticado en ruta pública (${pathname}), redirigiendo a /resumes`);
      return NextResponse.redirect(new URL('/resumes', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/signin', '/signup', '/resumes/:path*'], 
};
