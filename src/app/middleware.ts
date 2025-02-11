import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const hostname = request.headers.get('host')
    const path = request.nextUrl.pathname

    // Lógica de autenticação para admin
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Redirecionar rota raiz para (root) apenas no localhost
    if (hostname?.includes('localhost') && path === '/') {
        return NextResponse.redirect(new URL('/(root)', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/']
};