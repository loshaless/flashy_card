import { auth } from "@clerk/nextjs/server";
import { getDeckById } from "@/src/db/queries/decks";
import { getCardsByDeckId } from "@/src/db/queries/cards";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, BookOpen, Clock, Brain, Layers, Pencil } from "lucide-react";
import Link from "next/link";
import { CreateCardDialog } from "@/components/create-card-dialog";
import { EditCardDialog } from "@/components/edit-card-dialog";
import { DeleteCardButton } from "@/components/delete-card-button";
import { EditDeckDialog } from "@/components/edit-deck-dialog";
import { DeleteDeckButton } from "@/components/delete-deck-button";
import { Trash2 } from "lucide-react";
import { BulkAddCardsDialog } from "@/components/bulk-add-cards-dialog";
import { AIGenerateDialog } from "@/components/ai-generate-dialog";

type Props = {
    params: Promise<{ deckId: string }>;
};

export default async function DeckPage({ params }: Props) {
    const { userId, has } = await auth();
    if (!userId) redirect("/");

    const isPro = has({ plan: "pro" });

    const resolvedParams = await params;
    const deckId = parseInt(resolvedParams.deckId);
    if (isNaN(deckId)) redirect("/dashboard");

    const deck = await getDeckById(deckId, userId);
    if (!deck) redirect("/dashboard");

    const cards = await getCardsByDeckId(deckId);

    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group w-fit"
                >
                    <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
                    <div className="space-y-6 max-w-2xl flex-1">
                        <div className="flex flex-col gap-4">
                            <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                <Layers className="h-3 w-3" />
                                Deck Detail
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                                {deck.title}
                            </h1>
                            {deck.description && (
                                <p className="text-muted-foreground text-xl leading-relaxed">
                                    {deck.description}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-sm text-foreground/60 bg-muted/30 px-3 py-1.5 rounded-xl border border-border/50 backdrop-blur-sm">
                                    <BookOpen className="h-4 w-4 text-primary/60" />
                                    <span className="font-semibold">{cards.length} Cards</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground/60 bg-muted/30 px-3 py-1.5 rounded-xl border border-border/50 backdrop-blur-sm">
                                    <Clock className="h-4 w-4 text-primary/60" />
                                    <span className="font-semibold">Created {new Date(deck.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <Link href={`/decks/${deckId}/study`} className="w-full">
                                <Button className="w-full h-16 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-lg font-black uppercase tracking-tight group bg-linear-to-r from-primary to-primary/80">
                                    <Brain className="mr-3 h-6 w-6 transition-transform group-hover:rotate-12" />
                                    Study This Deck Now
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-xs md:shrink-0">
                        <CreateCardDialog
                            deckId={deckId}
                            trigger={
                                <Button className="h-14 px-8 rounded-2xl shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-95 text-md font-bold w-full bg-background border-border border-2 hover:bg-muted/50 text-foreground">
                                    <Plus className="mr-2 h-5 w-5 text-primary" />
                                    Add New Card
                                </Button>
                            }
                        />
                        <BulkAddCardsDialog deckId={deckId} isPro={isPro} />
                        <AIGenerateDialog deckId={deckId} deckTitle={deck.title} deckDescription={deck.description || ""} isPro={isPro} />

                        <EditDeckDialog
                            deck={{ id: deck.id, title: deck.title, description: deck.description }}
                            trigger={
                                <Button variant="secondary" className="h-14 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 text-md font-bold w-full border border-border/50 shadow-md">
                                    <Pencil className="mr-2 h-4 w-4 text-muted-foreground" />
                                    Edit Deck Detail
                                </Button>
                            }
                        />
                        <DeleteDeckButton
                            deckId={deckId}
                            redirectTo="/dashboard"
                            trigger={
                                <Button variant="ghost" className="h-14 px-8 rounded-2xl transition-all hover:scale-105 active:scale-95 text-md font-bold w-full hover:bg-destructive/10 hover:text-destructive text-muted-foreground">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Deck
                                </Button>
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/20 backdrop-blur-sm">
                            <Brain className="h-16 w-16 text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-semibold text-foreground">No cards in this deck</h3>
                            <p className="text-muted-foreground mb-6">Start by adding your first flashcard!</p>
                            <CreateCardDialog deckId={deckId} />
                        </div>
                    ) : (
                        cards.map((card) => (
                            <Card key={card.id} className="group overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 rounded-2xl">
                                <CardHeader className="pb-2 border-b border-border/50 bg-muted/20">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Front</CardTitle>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditCardDialog card={{ id: card.id, front: card.front, back: card.back, deckId }} />
                                            <DeleteCardButton cardId={card.id} deckId={deckId} />
                                        </div>
                                    </div>
                                    <p className="text-lg font-bold pt-2 whitespace-pre-wrap">{card.front}</p>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Back</p>
                                    <p className="text-md text-foreground/80 leading-relaxed whitespace-pre-wrap">{card.back}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
