import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { decks, cards } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
    // Example: Create a new deck
    const newDeck: typeof decks.$inferInsert = {
        userId: 'user_2sY...', // Example Clerk User ID
        title: 'Indonesian Language',
    };

    const insertedDecks = await db.insert(decks).values(newDeck).returning();
    const deck = insertedDecks[0];
    console.log('New deck created:', deck);

    // Example: Add a card to the deck
    const newCard: typeof cards.$inferInsert = {
        deckId: deck.id,
        front: 'Dog',
        back: 'Anjing',
    };

    await db.insert(cards).values(newCard);
    console.log('New card added!');

    // Query decks and cards
    const allDecks = await db.select().from(decks);
    console.log('All decks:', allDecks);

    const allCards = await db.select().from(cards).where(eq(cards.deckId, deck.id));
    console.log('Cards in deck:', allCards);
}

main();
