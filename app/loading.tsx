export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
            <div className="relative">
                {/* Outer glowing ring */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />

                {/* Spinning loader */}
                <div className="h-16 w-16 rounded-full border-4 border-muted border-t-primary animate-spin shadow-lg shadow-primary/20" />
            </div>

            <div className="mt-8 space-y-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                    Preparing your cards
                </h2>
                <div className="flex items-center justify-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                </div>
            </div>
        </div>
    );
}
