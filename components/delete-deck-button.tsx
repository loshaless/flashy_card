"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteDeckAction } from "@/app/actions/deck-actions";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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

interface DeleteDeckButtonProps {
    deckId: number;
    trigger?: React.ReactNode;
    redirectTo?: string;
}

export function DeleteDeckButton({ deckId, trigger, redirectTo }: DeleteDeckButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleDelete() {
        try {
            setLoading(true);
            await deleteDeckAction(deckId);
            toast.success("Deck deleted successfully");
            if (redirectTo) {
                router.push(redirectTo);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete deck");
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger || (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive z-20 h-8 w-8 rounded-full"
                        onClick={(e) => e.stopPropagation()} // Prevent link navigation
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your deck and all of its cards.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Deck"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
