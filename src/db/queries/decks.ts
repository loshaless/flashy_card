import { db } from "@/lib/db";
import { decks, cards } from "@/src/db/schema";
import { eq, sql, and } from "drizzle-orm";

export async function getUserDecks(userId: string) {
    return db
        .select({
            id: decks.id,
            title: decks.title,
            description: decks.description,
            createdAt: decks.createdAt,
            cardCount: sql<number>`count(${cards.id})::int`,
        })
        .from(decks)
        .leftJoin(cards, eq(decks.id, cards.deckId))
        .where(eq(decks.userId, userId))
        .groupBy(decks.id)
        .orderBy(decks.createdAt);
}

export async function createDeck(userId: string, data: { title: string; description?: string }) {
    return db.insert(decks).values({
        userId,
        title: data.title,
        description: data.description,
    }).returning();
}

export async function getDeckById(deckId: number, userId: string) {
    return db.query.decks.findFirst({
        where: (decks, { and, eq }) => and(eq(decks.id, deckId), eq(decks.userId, userId)),
    });
}

export async function deleteDeck(deckId: number, userId: string) {
    return db.delete(decks).where(and(eq(decks.id, deckId), eq(decks.userId, userId)));
}

export async function updateDeck(deckId: number, userId: string, data: { title: string; description?: string }) {
    return db
        .update(decks)
        .set({
            title: data.title,
            description: data.description,
        })
        .where(and(eq(decks.id, deckId), eq(decks.userId, userId)))
        .returning();
}
