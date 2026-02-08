"use client";

import { useState } from "react";
import { CopyPlus, Info } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { bulkCreateCardsAction } from "@/app/actions/card-actions";
import { toast } from "sonner";

interface BulkAddCardsDialogProps {
    deckId: number;
    isPro: boolean;
}

export function BulkAddCardsDialog({ deckId, isPro }: BulkAddCardsDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bulkText, setBulkText] = useState("");

    async function handleBulkAdd() {
        if (!isPro) {
            toast.error("Bulk adding is a Pro feature!");
            return;
        }

        const lines = bulkText.split("\n").filter(line => line.trim() !== "");
        const cardInputs = lines.map(line => {
            const [front, back] = line.split(";").map(s => s.trim());
            return { front, back };
        }).filter(card => card.front && card.back);

        if (cardInputs.length === 0) {
            toast.error("No valid cards found. Use 'Front ; Back' format.");
            return;
        }

        try {
            setLoading(true);
            await bulkCreateCardsAction({ deckId, cards: cardInputs });
            setOpen(false);
            setBulkText("");
            toast.success(`Successfully added ${cardInputs.length} cards!`);
        } catch (error: unknown) {
            console.error(error);
            const message = error instanceof Error ? error.message : "Failed to add cards";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="h-14 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 text-md font-bold w-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary"
                >
                    <CopyPlus className="mr-2 h-5 w-5" />
                    Bulk Add Cards
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-background border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CopyPlus className="h-5 w-5 text-primary" />
                        Bulk Add Flashcards
                    </DialogTitle>
                    <DialogDescription>
                        Add multiple cards at once. Enter each card on a new line using the format:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-muted/50 p-3 rounded-xl border border-border flex gap-3 text-xs text-muted-foreground">
                        <Info className="h-4 w-4 shrink-0 text-primary" />
                        <code className="flex-1">
                            Front text ; Back text<br />
                            Question 2 ; Answer 2<br />
                            Word 3 ; Translation 3
                        </code>
                    </div>

                    <Textarea
                        placeholder="Type or paste your cards here..."
                        className="min-h-[250px] bg-muted/30 border-border font-mono text-sm leading-relaxed"
                        value={bulkText}
                        onChange={(e) => setBulkText(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleBulkAdd}
                        disabled={loading || !bulkText.trim()}
                        className="w-full h-12 rounded-xl font-bold"
                    >
                        {loading ? "Adding Cards..." : `Add ${bulkText.split("\n").filter(l => l.trim()).length} Cards`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
