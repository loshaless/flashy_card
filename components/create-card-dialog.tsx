"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
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
import { createCardAction } from "@/app/actions/card-actions";
import { toast } from "sonner";

const formSchema = z.object({
    front: z.string().min(1, "Front text is required"),
    back: z.string().min(1, "Back text is required"),
});

interface CreateCardDialogProps {
    deckId: number;
    trigger?: React.ReactNode;
}

export function CreateCardDialog({ deckId, trigger }: CreateCardDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            front: "",
            back: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            await createCardAction({ ...values, deckId });
            setOpen(false);
            form.reset();
            toast.success("Card added successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add card");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="rounded-xl">
                        <Plus className="mr-2 h-4 w-4" /> Create Card
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border-border">
                <DialogHeader>
                    <DialogTitle>Add New Card</DialogTitle>
                    <DialogDescription>
                        Add a new flashcard to your deck.
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
                                {loading ? "Adding..." : "Add Card"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
