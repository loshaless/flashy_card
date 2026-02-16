import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function DeckLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                {/* Header Skeleton */}
                <div className="flex flex-col gap-6 mb-12">
                    <div className="flex items-center gap-4 text-primary animate-pulse">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm font-medium tracking-wide uppercase">Loading deck details...</span>
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-2/3 md:w-1/2 rounded-2xl bg-primary/5" />
                        <Skeleton className="h-6 w-full md:w-3/4 rounded-xl opacity-60" />
                    </div>
                </div>

                {/* Grid Skeletons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-6 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm space-y-4 h-64 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="space-y-3">
                                <Skeleton className="h-6 w-1/4 rounded-md opacity-40" />
                                <Skeleton className="h-20 w-full rounded-xl" />
                            </div>
                            <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-8 w-20 rounded-full bg-primary/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
