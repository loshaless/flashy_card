"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Check, X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudySessionProps {
    cards: {
        id: number;
        front: string;
        back: string;
        deckId: number;
    }[];
    deckTitle: string;
}

export default function StudySession({ cards, deckTitle }: StudySessionProps) {
    const router = useRouter();
    const [studyCards, setStudyCards] = useState(cards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState({ correct: 0, incorrect: 0 });

    // Sync studyCards if props change (though unlikely in this flow)
    useEffect(() => {
        setStudyCards(cards);
    }, [cards]);



    const handleNext = () => {
        if (currentIndex < studyCards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(currentIndex - 1), 150);
        }
    };

    const handleRestart = () => {
        setIsFinished(false);
        setCurrentIndex(0);
        setIsFlipped(false);
        setResults({ correct: 0, incorrect: 0 });
    };

    const handleShuffle = () => {
        const shuffled = [...cards].sort(() => Math.random() - 0.5);
        setStudyCards(shuffled);
        handleRestart();
    };

    const handleMark = (isCorrect: boolean) => {
        setResults((prev) => ({
            ...prev,
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect,
        }));
        handleNext();
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isFinished) return;

            switch (e.key) {
                case " ":
                case "Spacebar":
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    setIsFlipped((prev) => !prev);
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (isFlipped) {
                        handleMark(false);
                    } else {
                        handlePrevious();
                    }
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    if (isFlipped) {
                        handleMark(true);
                    } else {
                        handleNext();
                    }
                    break;
                case "1":
                    if (isFlipped) handleMark(false);
                    break;
                case "2":
                    if (isFlipped) handleMark(true);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFinished, isFlipped, currentIndex, studyCards.length]);

    if (cards.length === 0) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold">No cards in this deck.</h2>
                <p className="text-muted-foreground mt-2">Add some cards to start studying!</p>
                <Button className="mt-4" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    const currentCard = studyCards[currentIndex];

    if (isFinished) {
        return (
            <div className="max-w-md mx-auto text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <Card className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Good job!</h2>
                    <p className="text-muted-foreground mb-6">
                        You&apos;ve gone through all the cards in <strong>{deckTitle}</strong>.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                            <div className="text-3xl font-bold text-green-600 mb-1">{results.correct}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-green-600/60">Correct</div>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                            <div className="text-3xl font-bold text-red-600 mb-1">{results.incorrect}</div>
                            <div className="text-xs font-bold uppercase tracking-wider text-red-600/60">Incorrect</div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button onClick={handleRestart} variant="outline">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restart
                        </Button>
                        <Button onClick={() => router.back()}>
                            Back to Deck
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Header Controls */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={() => router.back()} className="-ml-4 text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                </Button>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span className="text-green-600 flex items-center gap-1"><Check className="h-3 w-3" /> {results.correct}</span>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-red-500 flex items-center gap-1"><X className="h-3 w-3" /> {results.incorrect}</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleShuffle} className="gap-2">
                        <Shuffle className="h-3.5 w-3.5" />
                        Shuffle
                    </Button>
                </div>
            </div>

            {/* Progress */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Card {currentIndex + 1} of {studyCards.length}</span>
                <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${((currentIndex + 1) / studyCards.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Flashcard Area */}
            <div
                className="perspective-1000 h-80 w-full cursor-pointer group"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div
                    className={cn(
                        "relative w-full h-full transition-all duration-500 preserve-3d",
                        isFlipped ? "rotate-y-180" : ""
                    )}
                >
                    {/* Front */}
                    <Card className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 text-center border-2 border-primary/10 shadow-lg hover:border-primary/30 transition-colors">
                        <CardContent className="space-y-4">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Question</span>
                            <h3 className="text-2xl font-bold">{currentCard?.front}</h3>
                            <p className="text-xs text-muted-foreground mt-4 absolute bottom-4">Click to flip</p>
                        </CardContent>
                    </Card>

                    {/* Back */}
                    <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center border-2 border-primary/10 shadow-lg bg-secondary/10">
                        <CardContent className="space-y-4">
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Answer</span>
                            <h3 className="text-2xl font-bold text-primary">{currentCard?.back}</h3>
                            <p className="text-xs text-muted-foreground mt-4 absolute bottom-4">Click to flip back</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center pt-8 h-20">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="w-32"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>

                {isFlipped ? (
                    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <Button
                            onClick={(e) => { e.stopPropagation(); handleMark(false); }}
                            className="bg-red-500 hover:bg-red-600 text-white w-32 border-b-4 border-red-700 active:border-b-0 active:translate-y-1"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Incorrect (1)
                        </Button>
                        <Button
                            onClick={(e) => { e.stopPropagation(); handleMark(true); }}
                            className="bg-green-500 hover:bg-green-600 text-white w-32 border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Correct (2)
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={handleNext}
                        className="w-32"
                    >
                        {currentIndex === studyCards.length - 1 ? "Finish" : "Next"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Keyboard Shortcuts Legend */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        Space
                    </kbd>
                    <span>Flip</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        ← / →
                    </kbd>
                    <span>Nav / Grade</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        1
                    </kbd>
                    <span>Incorrect</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                        2
                    </kbd>
                    <span>Correct</span>
                </div>
            </div>
        </div>
    );
}
