import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Premium Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse [animation-delay:2s]" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-64 md:w-96 rounded-2xl bg-primary/5" />
                        <Skeleton className="h-6 w-48 md:w-80 rounded-xl bg-muted/50" />
                    </div>
                    {/* Pulsing Loading Indicator */}
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 animate-pulse">
                        <Loader2 className="h-4 w-4 text-primary animate-spin" />
                        <span className="text-sm font-medium text-primary/80">Syncing with database...</span>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card key={index} className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm h-64 flex flex-col scale-100 animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <CardHeader className="pb-2 space-y-4">
                                    <Skeleton className="h-7 w-3/4 rounded-lg" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full rounded-md opacity-70" />
                                        <Skeleton className="h-4 w-5/6 rounded-md opacity-50" />
                                    </div>
                                </CardHeader>
                                <CardContent className="mt-auto pt-4 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-5 w-5 rounded-full bg-primary/10" />
                                        <Skeleton className="h-4 w-20 rounded-md" />
                                    </div>
                                    <Skeleton className="h-3 w-28 rounded-md bg-muted/40" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-12">
                        <Skeleton className="h-12 w-48 rounded-full bg-primary/10 shadow-lg shadow-primary/5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
