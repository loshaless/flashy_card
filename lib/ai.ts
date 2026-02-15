import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE_URL,
});

export const flashcardSchema = z.object({
    cards: z.array(
        z.object({
            front: z.string(),
            back: z.string(),
        })
    ),
});

export type FlashcardResponse = z.infer<typeof flashcardSchema>;

export async function generateFlashcardsContent(
    title: string,
    description?: string,
    count: number = 20
): Promise<FlashcardResponse> {
    const systemPrompt =
        `You are an expert educator. Generate ${count} high-quality, concise flashcards based on the provided deck title and description. Each card should have a clear question or concept on the 'front' and a clear, concise answer on the 'back'. Respond ONLY with a valid JSON object.`;
    const userPrompt = `Deck Title: ${title}\nDeck Description: ${description || "No description provided."
        }`;

    const response = await openai.chat.completions.create({
        model: process.env.MODEL_NAME || "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        // response_format: { type: "json_object" }, // Removed to support wider range of models
    });

    const message = response.choices[0].message;
    let content = message.content;

    if (!content) {
        console.error("OpenAI Response content is empty:", JSON.stringify(message, null, 2));
        throw new Error("Failed to generate flashcards content: Empty response from AI");
    }

    // Clean up content if it contains markdown code blocks
    content = content.replace(/```json\n?|```/g, "").trim();

    try {
        const rawData = JSON.parse(content);
        return flashcardSchema.parse(rawData);
    } catch (error) {
        console.error("AI Response parsing error:", error);
        console.error("Raw content:", content);
        throw new Error("AI returned invalid data format");
    }
}