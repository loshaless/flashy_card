import { LoadingAnimation } from "@/components/loading-animation";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-background/60 backdrop-blur-xl">
            {/* Background elements for depth */}
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse pointer-events-none [animation-delay:1s]" />

            <div className="relative z-10 p-10 rounded-3xl border border-white/5 bg-background/40 backdrop-blur-2xl shadow-2xl shadow-primary/5">
                <LoadingAnimation message="Preparing your journey" />
            </div>
        </div>
    );
}
