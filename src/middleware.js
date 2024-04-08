

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
// import { toast } from 'react-toastify';

export function middleware(request) {
    console.log("middleware executed");
    // Example response

    let token = request.cookies.get("authToken")?.value;

    if(request.nextUrl.pathname ==="/api/login" || request.nextUrl.pathname==="/api/user"){
        return;
    }

    const loggedinusernotaccessedpaths = request.nextUrl.pathname === "/signinpage" || request.nextUrl.pathname === "/signuppage";

    if (loggedinusernotaccessedpaths) {
        if (token) {
            const redirectUrl = new URL("/addtask", request.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }
    } else {
        if (!token) {
            if(request.nextUrl.pathname.startsWith("/api")){
                return NextResponse.json({
                    message:"access denied ",
                    success:false,
                },{
                    status:401,
                })
            }

            console.log(123);
            request.warningMessage = "Login is required";
            const redirectUrl = new URL("/signinpage", request.nextUrl.origin);
            return NextResponse.redirect(redirectUrl);
        }
    }

    console.log(token);

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/addtask',
        "/showtask",
        "/signuppage",
        "/signinpage",
        "/showalltask",
        // "/api/:path*",
    ],
};
