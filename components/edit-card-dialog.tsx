"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil } from "lucide-react";
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { updateCardAction } from "@/app/actions/card-actions";
import { toast } from "sonner";

const formSchema = z.object({
    front: z.string().min(1, "Front text is required"),
    back: z.string().min(1, "Back text is required"),
});

interface EditCardDialogProps {
    card: {
        id: number;
        front: string;
        back: string;
        deckId: number;
    };
    trigger?: React.ReactNode;
}

export function EditCardDialog({ card, trigger }: EditCardDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            front: card.front,
            back: card.back,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await updateCardAction({
                id: card.id,
                deckId: card.deckId,
                ...values
            });
            setOpen(false);
            toast.success("Card updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update card");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-border">
                <DialogHeader>
                    <DialogTitle>Edit Card</DialogTitle>
                    <DialogDescription>
                        Update the content of your flashcard.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="front"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Front (Question/Word)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="What's on the front?" {...field} className="bg-muted/50 border-border min-h-[100px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="back"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Back (Answer/Translation)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="What's on the back?" {...field} className="bg-muted/50 border-border min-h-[100px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Updating..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
