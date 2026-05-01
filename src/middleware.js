// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });

  const isAuthPage = req.nextUrl.pathname === "/login" ; 
  const isRegPage = req.nextUrl.pathname === "/register" ;
  if ((token && isAuthPage ) || (token && isRegPage) ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}