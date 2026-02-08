import Image from "next/image";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100-3.5rem)] items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-[calc(100vh-3.5rem)] w-full max-w-3xl flex-col items-center justify-center gap-12 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <SignedOut>
            <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
              Your Next.js project is now secured with Clerk.
            </h1>
            <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              Sign in to see the authenticated state and explore the possibilities.
            </p>
          </SignedOut>
          <SignedIn>
            <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
              Welcome back! You are successfully authenticated.
            </h1>
            <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
              You can now access protected routes and manage your profile using Clerk.
            </p>
          </SignedIn>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 md:w-[180px]"
            href="https://clerk.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clerk Documentation
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-zinc-200 px-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 md:w-[180px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
      </main>
    </div>
  );
}

