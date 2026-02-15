import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const GUEST_COOKIE_NAME = "vibe-coding-guest-mode";
export const GUEST_USER_ID = "guest_user_demo";

export async function getAuth() {
    const clerkAuth = await auth();

    if (clerkAuth.userId) {
        return {
            userId: clerkAuth.userId,
            has: clerkAuth.has,
            isGuest: false,
        };
    }

    const cookieStore = await cookies();
    const isGuest = cookieStore.get(GUEST_COOKIE_NAME)?.value === "true";

    if (isGuest) {
        return {
            userId: GUEST_USER_ID,
            // Mocking the 'has' function for guest to return true for 'pro' plan
            has: (args?: { permission?: string; role?: string; plan?: string }) => {
                if (args?.plan === "pro") return true;
                return false;
            },
            isGuest: true,
        };
    }

    return {
        userId: null,
        has: clerkAuth.has,
        isGuest: false,
    };
}
