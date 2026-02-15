"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateAICardsAction } from "@/app/actions/ai-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AIGenerateDialogProps {
    deckId: number;
    deckTitle: string;
    deckDescription: string;
    isPro: boolean;
}

export function AIGenerateDialog({ deckId, deckTitle, deckDescription, isPro }: AIGenerateDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10);
    const router = useRouter();

    async function handleGenerate() {
        if (!isPro) {
            router.push("/pricing");
            return;
        }

        try {
            setLoading(true);

            await generateAICardsAction({
                deckId,
                title: deckTitle,
                description: deckDescription,
                count
            });

            setOpen(false);
            toast.success(`Successfully generated ${count} cards for ${deckTitle}!`);
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : "Failed to generate cards";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    const triggerButton = (
        <Button
            onClick={() => {
                if (!isPro) {
                    router.push("/pricing");
                }
            }}
            className="h-14 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 text-md font-bold w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 disabled:opacity-80"
        >
            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
            Generate with AI
        </Button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {isPro ? (
                <DialogTrigger asChild>
                    {triggerButton}
                </DialogTrigger>
            ) : (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {triggerButton}
                        </TooltipTrigger>
                        <TooltipContent className="bg-purple-600 text-white font-semibold rounded-xl p-3 shadow-xl border-none">
                            <p>✨ AI Generation is a Pro feature</p>
                            <p className="text-xs opacity-80">Click to upgrade your plan</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            <DialogContent className="sm:max-w-[425px] bg-background border-border rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        AI Card Generation
                    </DialogTitle>
                    <DialogDescription className="text-md">
                        Our AI will analyze <strong>{deckTitle}</strong> and generate flashcards for you.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 flex flex-col items-center justify-center space-y-6">
                    {loading ? (
                        <>
                            <div className="relative">
                                <Loader2 className="h-16 w-16 text-purple-500 animate-spin" />
                                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-purple-400 animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-indigo-500 animate-pulse">
                                    Brainstorming {count} cards...
                                </p>
                                <p className="text-sm text-muted-foreground p-2 bg-muted/50 rounded-lg italic">
                                    &quot;Active recall is the fastest way to learn!&quot;
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="w-full space-y-6">
                            <div className="text-center space-y-4 bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <BrainIcon className="h-12 w-12 text-purple-500 mx-auto opacity-50" />
                                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                                    We&apos;ll use your deck title and description to create comprehensive study material.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="card-count" className="text-sm font-medium">
                                    Number of cards to generate (1-20)
                                </Label>
                                <Input
                                    id="card-count"
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={count}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val)) setCount(val);
                                    }}
                                    className="h-12 rounded-xl border-border/50 bg-background/50 focus:ring-purple-500/20"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || count < 1 || count > 20}
                        className="w-full h-14 rounded-2xl font-bold text-lg bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-95"
                    >
                        {loading ? "Generating..." : `Generate ${count} Cards`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
        </svg>
    )
}
