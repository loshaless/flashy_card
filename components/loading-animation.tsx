"use client";

import { useEffect, useState } from "react";
import { Database, Zap } from "lucide-react";

export function LoadingAnimation({ message = "Connecting to database..." }: { message?: string }) {
    const [dots, setDots] = useState("");
    const [status, setStatus] = useState(message);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 500);

        const timer = setTimeout(() => {
            setStatus("Waking up database... (Free tier)");
        }, 4000);

        const timer2 = setTimeout(() => {
            setStatus("Almost there! Fetching your data...");
        }, 8000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }, [message]);

    return (
        <div className="flex flex-col items-center justify-center gap-6 animate-in fade-in duration-700">
            <div className="relative flex items-center justify-center">
                {/* Multilayered animated glow */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse scale-150" />
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-bounce scale-200 [animation-duration:3s]" />

                {/* Core Icon Assembly */}
                <div className="relative z-10 p-5 rounded-2xl bg-card border border-primary/20 shadow-xl shadow-primary/5">
                    <Database className="h-10 w-10 text-primary animate-pulse" strokeWidth={1.5} />
                    <div className="absolute -top-1 -right-1">
                        <Zap className="h-5 w-5 text-primary animate-bounce fill-primary" />
                    </div>
                </div>

                {/* Orbital ring */}
                <div className="absolute h-24 w-24 border-2 border-primary/20 rounded-full animate-[spin_3s_linear_infinite]" />
                <div className="absolute h-24 w-24 border-t-2 border-primary rounded-full animate-spin" />
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-foreground tracking-tight transition-all duration-500">
                    {status}
                    <span className="inline-block w-8 text-left">{dots}</span>
                </h3>
                <div className="flex flex-col gap-1 items-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em]">
                        Processing Request
                    </p>
                    <div className="h-1 w-32 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-[loading-bar_2s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
