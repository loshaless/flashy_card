"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-65px)] overflow-hidden bg-background">
      {/* Premium Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 px-4 text-center">
        <div className="space-y-4 mb-10">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Flash <span className="text-muted-foreground opacity-80">Card</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Your Personal Flashcard Platform
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="rounded-full px-8 h-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg font-semibold transition-all hover:scale-105 active:scale-95">
                Sign Up
              </Button>
            </SignUpButton>
            <form action={async () => {
              const { loginAsGuest } = await import("@/app/actions/guest");
              await loginAsGuest();
            }}>
              <Button variant="ghost" size="lg" className="rounded-full px-8 h-12 text-lg font-semibold transition-all hover:scale-105 active:scale-95">
                Guest Mode
              </Button>
            </form>
          </SignedOut>

          <SignedIn>
            <Button size="lg" asChild className="rounded-full px-8 h-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
          </SignedIn>
        </div>
      </div>

      {/* Decorative lines or patterns could go here for more "WOW" effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
    </div>
  );
}


