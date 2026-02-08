"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { decks } from "@/src/db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createDeckSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().max(500).optional(),
});

export type CreateDeckInput = z.infer<typeof createDeckSchema>;

export async function createDeckAction(data: CreateDeckInput) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const validatedData = createDeckSchema.parse(data);

    await db.insert(decks).values({
        userId,
        title: validatedData.title,
        description: validatedData.description,
    });

    revalidatePath("/dashboard");
}
