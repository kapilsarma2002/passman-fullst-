import { NextRequest, NextResponse } from 'next/server'

const signedinPages = ['/', '/add']

export default function middleware(req: NextRequest) {

  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get('PASS')

    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    } 
  }

}

export const config = {
  matcher: '/'
}
