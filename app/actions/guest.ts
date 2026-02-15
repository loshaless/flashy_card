"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GUEST_COOKIE_NAME } from "@/lib/auth-helper";

export async function loginAsGuest() {
    const cookieStore = await cookies();
    // cookies().set is available in Server Actions
    cookieStore.set(GUEST_COOKIE_NAME, "true", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    redirect("/dashboard");
}

export async function logoutGuest() {
    const cookieStore = await cookies();
    cookieStore.delete(GUEST_COOKIE_NAME);
    redirect("/");
}
