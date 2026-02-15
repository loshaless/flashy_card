import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-4"> {/* Increased spacing for skeleton breathing room */}
                        {/* Title Skeleton */}
                        <Skeleton className="h-10 w-64 md:w-96 rounded-lg bg-primary/10" />
                        {/* Subtitle Skeleton */}
                        <Skeleton className="h-6 w-48 md:w-80 rounded-md bg-muted" />
                    </div>
                </div>

                {/* Optional: Mock limit banner skeleton if frequently seen, or skip to grid */}

                <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Generate 8 card skeletons to fill the screen */}
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Card key={index} className="relative overflow-hidden border-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
                                <CardHeader className="pb-2 space-y-2">
                                    {/* Card Title Skeleton */}
                                    <Skeleton className="h-6 w-3/4 rounded-md" />
                                    {/* Card Description Skeleton */}
                                    <Skeleton className="h-4 w-full rounded-md bg-muted-foreground/20" />
                                    <Skeleton className="h-4 w-5/6 rounded-md bg-muted-foreground/20" />
                                </CardHeader>
                                <CardContent className="mt-auto pt-4 flex flex-col gap-3">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-4 rounded-full" />
                                        <Skeleton className="h-4 w-16 rounded-md" />
                                    </div>
                                    <Skeleton className="h-3 w-24 rounded-md bg-muted-foreground/10" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {/* Centered Button Skeleton */}
                    <div className="flex justify-center mt-8">
                        <Skeleton className="h-10 w-40 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
