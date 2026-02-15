import { getAuth } from "@/lib/auth-helper";
import { getUserDecks } from "@/src/db/queries/decks";
import { CreateDeckDialog } from "@/components/create-deck-dialog";
import { DeleteDeckButton } from "@/components/delete-deck-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { userId, has } = await getAuth();

    if (!userId) {
        redirect("/");
    }

    // Fetch decks with card counts
    const userDecks = await getUserDecks(userId);

    const isPro = has({ plan: "pro" });
    const isAtLimit = !isPro && userDecks.length >= 3;

    return (
        <div className="min-h-[calc(100vh-65px)] bg-background relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto py-10 px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
                            My Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg italic">
                            Level up your learning, one card at a time.
                        </p>
                    </div>
                </div>

                {isAtLimit && (
                    <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3">
                            <Layers className="h-5 w-5 text-primary" />
                            <p className="text-sm font-medium">
                                You&apos;ve reached the 3 deck limit for the Free plan.
                                <span className="hidden sm:inline"> Upgrade to Pro for unlimited decks!</span>
                            </p>
                        </div>
                        <Link href="/pricing">
                            <Button size="sm" variant="default" className="rounded-full px-4 font-bold shadow-sm hover:scale-105 active:scale-95 transition-all">
                                Upgrade Now
                            </Button>
                        </Link>
                    </div>
                )}

                {userDecks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl bg-muted/20 backdrop-blur-sm">
                        <Layers className="h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-xl font-semibold text-foreground">No decks yet</h3>
                        <p className="text-muted-foreground mb-6">Create your first deck to start studying!</p>
                        <CreateDeckDialog isAtLimit={isAtLimit} />
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {userDecks.map((deck) => (
                                <div key={deck.id} className="relative group">
                                    <DeleteDeckButton deckId={deck.id} />
                                    <Link href={`/decks/${deck.id}`}>
                                        <Card className="relative overflow-hidden border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col">
                                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
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
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <CreateDeckDialog isAtLimit={isAtLimit} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
