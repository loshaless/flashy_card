"use client";

import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="relative min-h-[calc(100vh-65px)] bg-background flex flex-col items-center py-20 px-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-size-[40px_40px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container relative z-10 max-w-5xl">
                <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that&apos;s right for you and start mastering any subject with flashcards.
                    </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    {/* Clerk's PricingTable component pulls directly from your dashboard configuration */}
                    <PricingTable />
                </div>

                <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
                    <p className="text-muted-foreground">
                        All plans include core features. Need a custom plan? <Link href="mailto:support@example.com" className="text-primary hover:underline underline-offset-4">Contact us</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
