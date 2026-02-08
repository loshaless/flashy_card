"use server";

import { auth } from "@clerk/nextjs/server";
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
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = createCardSchema.parse(data);

    await createCard(validatedData);

    revalidatePath(`/decks/${validatedData.deckId}`);
}

export async function updateCardAction(data: UpdateCardInput) {
    const { userId } = await auth();

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
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    await deleteCard(cardId);

    revalidatePath(`/decks/${deckId}`);
}
