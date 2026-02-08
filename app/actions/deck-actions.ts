"use server";

import { auth } from "@clerk/nextjs/server";
import { createDeck, deleteDeck, updateDeck } from "@/src/db/queries/decks";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createDeckSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
});

export type CreateDeckInput = z.infer<typeof createDeckSchema>;

export async function createDeckAction(data: CreateDeckInput) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    const validatedData = createDeckSchema.parse(data);

    await createDeck(userId, validatedData);

    revalidatePath("/dashboard");
}

export async function updateDeckAction(deckId: number, data: CreateDeckInput) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = createDeckSchema.parse(data);

    await updateDeck(deckId, userId, validatedData);

    revalidatePath("/dashboard");
    revalidatePath(`/decks/${deckId}`);
}

export async function deleteDeckAction(deckId: number) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    await deleteDeck(deckId, userId);

    revalidatePath("/dashboard");
}
