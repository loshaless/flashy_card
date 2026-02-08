"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCardAction } from "@/app/actions/card-actions";
import { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteCardButtonProps {
    cardId: number;
    deckId: number;
}

export function DeleteCardButton({ cardId, deckId }: DeleteCardButtonProps) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        try {
            setLoading(true);
            await deleteCardAction(cardId, deckId);
            toast.success("Card deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete card");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Flashcard?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will remove this card from your deck. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Card"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
