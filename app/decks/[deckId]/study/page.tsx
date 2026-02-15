import { getCardsByDeckId } from "@/src/db/queries/cards";
import { getDeckById } from "@/src/db/queries/decks";
import { getAuth } from "@/lib/auth-helper";
import { redirect } from "next/navigation";
import StudySession from "./study-session";

export default async function StudyPage({
    params,
}: {
    params: Promise<{ deckId: string }>;
}) {
    const { deckId } = await params;
    const { userId } = await getAuth();

    if (!userId) {
        redirect("/sign-in");
    }

    const parsedDeckId = parseInt(deckId);

    if (isNaN(parsedDeckId)) {
        return <div>Invalid Deck ID</div>;
    }

    const deck = await getDeckById(parsedDeckId, userId as string);

    if (!deck) {
        return <div>Deck not found</div>;
    }

    const cards = await getCardsByDeckId(parsedDeckId);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">{deck.title} - Study Mode</h1>
            <StudySession cards={cards} deckTitle={deck.title} />
        </div>
    );
}
