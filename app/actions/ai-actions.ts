"use server";

import { getAuth } from "@/lib/auth-helper";
import { generateFlashcardsContent } from "@/lib/ai";
import { bulkCreateCards } from "@/src/db/queries/cards";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const generateAICardsSchema = z.object({
    deckId: z.number(),
    title: z.string(),
    description: z.string().optional(),
    count: z.number().min(1).max(20).default(20),
});

export type GenerateAICardsInput = z.infer<typeof generateAICardsSchema>;

export async function generateAICardsAction(data: GenerateAICardsInput) {
    const { userId, has } = await getAuth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    // Checking for pro plan as per component logic
    const isPro = has({ plan: "pro" });
    if (!isPro) {
        throw new Error("AI Generation is a Pro feature. Upgrade to use it!");
    }

    const { deckId, title, description, count } = generateAICardsSchema.parse(data);

    try {
        const { cards: generatedCards } = await generateFlashcardsContent(title, description, count);

        if (generatedCards.length > 0) {
            await bulkCreateCards(
                generatedCards.map((card) => ({
                    deckId,
                    front: card.front,
                    back: card.back,
                }))
            );
        }

        revalidatePath(`/decks/${deckId}`);
    } catch (error) {
        console.error("AI Generation Action Error:", error);
        throw error instanceof Error ? error : new Error("Failed to generate AI cards");
    }
}
