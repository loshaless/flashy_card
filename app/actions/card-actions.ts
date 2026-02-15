"use server";

import { getAuth } from "@/lib/auth-helper";
import { createCard, updateCard, deleteCard } from "@/src/db/queries/cards";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createCardSchema = z.object({
    deckId: z.number(),
    front: z.string().min(1, "Front text is required"),
    back: z.string().min(1, "Back text is required"),
});

const updateCardSchema = z.object({
    id: z.number(),
    front: z.string().min(1, "Front text is required"),
    back: z.string().min(1, "Back text is required"),
    deckId: z.number(),
});

export type CreateCardInput = z.infer<typeof createCardSchema>;
export type UpdateCardInput = z.infer<typeof updateCardSchema>;

export async function createCardAction(data: CreateCardInput) {
    const { userId } = await getAuth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = createCardSchema.parse(data);

    await createCard(validatedData);

    revalidatePath(`/decks/${validatedData.deckId}`);
}

export async function updateCardAction(data: UpdateCardInput) {
    const { userId } = await getAuth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = updateCardSchema.parse(data);

    await updateCard(validatedData.id, {
        front: validatedData.front,
        back: validatedData.back,
    });

    revalidatePath(`/decks/${validatedData.deckId}`);
}

export async function deleteCardAction(cardId: number, deckId: number) {
    const { userId } = await getAuth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    await deleteCard(cardId);

    revalidatePath(`/decks/${deckId}`);
}

const bulkCreateCardsSchema = z.object({
    deckId: z.number(),
    cards: z.array(z.object({
        front: z.string().min(1, "Front text is required"),
        back: z.string().min(1, "Back text is required"),
    })).min(1),
});

export type BulkCreateCardsInput = z.infer<typeof bulkCreateCardsSchema>;

export async function bulkCreateCardsAction(data: BulkCreateCardsInput) {
    const { userId, has } = await getAuth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const isPro = has({ plan: "pro" });
    if (!isPro) {
        throw new Error("Bulk adding is a Pro feature. Upgrade to add multiple cards at once!");
    }

    const validatedData = bulkCreateCardsSchema.parse(data);

    // Add cards one by one or in bulk if query supports it
    // Our query createCard currently handles one. Let's add bulk support to query or just loop.
    for (const card of validatedData.cards) {
        await createCard({ ...card, deckId: validatedData.deckId });
    }

    revalidatePath(`/decks/${validatedData.deckId}`);
}
