import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { decks, cards } from "@/src/db/schema";
import { eq, sql } from "drizzle-orm";
import { CreateDeckDialog } from "@/components/create-deck-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-65px)]">
                <p className="text-xl text-muted-foreground">Please sign in to view your dashboard.</p>
            </div>
        );
    }

    // Fetch decks with card counts
    const userDecks = await db
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

    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                            My Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Level up your learning, one card at a time.
                        </p>
                    </div>
                </div>

                {userDecks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/20 backdrop-blur-sm">
                        <Layers className="h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground">No decks yet</h3>
                        <p className="text-muted-foreground mb-6">Create your first deck to start studying!</p>
                        <CreateDeckDialog />
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {userDecks.map((deck) => (
                                <Link key={deck.id} href={`/dashboard/deck/${deck.id}`}>
                                    <Card className="group relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                                                {deck.title}
                                            </CardTitle>
                                            {deck.description && (
                                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 font-normal">
                                                    {deck.description}
                                                </p>
                                            )}
                                        </CardHeader>
                                        <CardContent className="mt-auto pt-4 flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{deck.cardCount} cards</span>
                                            </div>
                                            <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-bold">
                                                Created {new Date(deck.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <CreateDeckDialog />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
