import { db } from "@/lib/db";
import { cards } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getCardsByDeckId(deckId: number) {
    return db.query.cards.findMany({
        where: (cards, { eq }) => eq(cards.deckId, deckId),
        orderBy: (cards, { asc }) => [asc(cards.createdAt)],
    });
}

export async function createCard(data: { deckId: number; front: string; back: string }) {
    return db.insert(cards).values({
        deckId: data.deckId,
        front: data.front,
        back: data.back,
    }).returning();
}

export async function updateCard(cardId: number, data: { front: string; back: string }) {
    return db.update(cards)
        .set({
            front: data.front,
            back: data.back,
            updatedAt: new Date(),
        })
        .where(eq(cards.id, cardId))
        .returning();
}

export async function deleteCard(cardId: number) {
    return db.delete(cards).where(eq(cards.id, cardId));
}

export async function bulkCreateCards(data: { deckId: number; front: string; back: string }[]) {
    return db.insert(cards).values(data).returning();
}

