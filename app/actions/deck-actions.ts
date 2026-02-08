"use server";

import { auth } from "@clerk/nextjs/server";
import { createDeck, deleteDeck, updateDeck, getUserDecks } from "@/src/db/queries/decks";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createDeckSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
});

export type CreateDeckInput = z.infer<typeof createDeckSchema>;

export async function createDeckAction(data: CreateDeckInput) {
    const { userId, has } = await auth();

    if (!userId) {
        redirect("/");
    }

    // Check plan and deck limit
    const isPro = has({ plan: "pro" });
    if (!isPro) {
        const userDecks = await getUserDecks(userId);
        if (userDecks.length >= 3) {
            throw new Error("You've reached the 3 deck limit for the Free plan. Upgrade to Pro for unlimited decks!");
        }
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
