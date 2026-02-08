import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const decks = pgTable("decks", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const cards = pgTable("cards", {
    id: serial("id").primaryKey(),
    deckId: integer("deck_id").references(() => decks.id).notNull(),
    front: text("front").notNull(),
    back: text("back").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
