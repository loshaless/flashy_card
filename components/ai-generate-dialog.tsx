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
import { bulkCreateCardsAction } from "@/app/actions/card-actions";
import { toast } from "sonner";

interface AIGenerateDialogProps {
    deckId: number;
    deckTitle: string;
    isPro: boolean;
}

export function AIGenerateDialog({ deckId, deckTitle, isPro }: AIGenerateDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleGenerate() {
        if (!isPro) {
            toast.error("AI Generation is a Pro feature!");
            return;
        }

        try {
            setLoading(true);

            // Simulating AI generation for demonstration
            // In a real app, this would call an OpenAI/Anthropic API
            await new Promise(resolve => setTimeout(resolve, 2000));

            const simulatedAICards = [
                { front: `What is the capital of ${deckTitle}?`, back: `The capital depends on the context of ${deckTitle}.` },
                { front: `Define the core concept of ${deckTitle}.`, back: `The core concept relates to the key principles of ${deckTitle}.` },
                { front: `Why is ${deckTitle} important?`, back: `It is important for mastering the subject matter.` },
                { front: `What is a common mistake when learning ${deckTitle}?`, back: `A common mistake is not practicing enough with flashcards!` },
                { front: `How can I improve my ${deckTitle} skills?`, back: `Consistency and active recall are key.` },
            ];

            await bulkCreateCardsAction({ deckId, cards: simulatedAICards });

            setOpen(false);
            toast.success(`Successfully generated 5 cards for ${deckTitle}!`);
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : "Failed to generate cards";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="h-14 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 text-md font-bold w-full bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20"
                >
                    <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                    Generate with AI
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        AI Card Generation
                    </DialogTitle>
                    <DialogDescription>
                        Using AI to generate the best flashcards for <strong>{deckTitle}</strong>. This might take a few seconds.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 flex flex-col items-center justify-center space-y-4">
                    {loading ? (
                        <>
                            <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                            <p className="text-sm text-muted-foreground animate-pulse">Brainstorming the best cards...</p>
                        </>
                    ) : (
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                We will analyze your deck title and generate 5 relevant cards to get you started.
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full h-12 rounded-xl font-bold bg-purple-600 hover:bg-purple-700"
                    >
                        {loading ? "Generating..." : "Generate 5 Cards"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
