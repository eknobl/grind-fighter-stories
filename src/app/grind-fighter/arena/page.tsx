'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Fighter } from '@/types/fighter';
import { FighterCard } from '@/components/FighterCard';
import { StoryGenerator } from '@/components/StoryGenerator';
import { TournamentBracket } from '@/components/TournamentBracket';
import { FighterEditor } from '@/components/FighterEditor';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
    const [fighters, setFighters] = useState<Fighter[]>([]);
    const [matches, setMatches] = useState<any[]>([]);
    const [selectedFighters, setSelectedFighters] = useState<Fighter[]>([]);
    const [activeMatch, setActiveMatch] = useState<any | null>(null);
    const [editingFighter, setEditingFighter] = useState<Fighter | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    useEffect(() => {
        const fetchTournamentData = async () => {
            try {
                const res = await fetch('/api/tournament/current');
                const data = await res.json();
                if (data.error && !data.fighters) {
                    setLoadError(data.error);
                    return;
                }
                if (data.fighters) setFighters(data.fighters);
                if (data.matches) setMatches(data.matches);
            } catch (e) {
                console.error('Failed to fetch tournament data', e);
                setLoadError('Could not connect to tournament server.');
            }
        };
        fetchTournamentData();
    }, []);

    const toggleFighterSelection = useCallback((fighter: Fighter) => {
        if (selectedFighters.find(f => f.id === fighter.id)) {
            setSelectedFighters(prev => prev.filter(f => f.id !== fighter.id));
            setActiveMatch(null); // Clear active match if manually deselecting
        } else {
            if (selectedFighters.length < 2) {
                setSelectedFighters(prev => [...prev, fighter]);
                setActiveMatch(null); // Clear active match if manually selecting
            }
        }
    }, [selectedFighters]);

    const handleMatchClick = (match: any) => {
        const f1 = fighters.find(f => Number(f.id) === match.fighter1Id);
        const f2 = fighters.find(f => Number(f.id) === match.fighter2Id);
        if (f1 && f2) {
            setSelectedFighters([f1, f2]);
            setActiveMatch(match);
        }
    };

    const handleStoryComplete = async (story: string, type: string) => {
        // If we are in a match, we need to pick a winner.
        // For MVP, let's just use a simple prompt or assume the user will click a winner button that we need to add to StoryGenerator?
        // Actually, let's just let the StoryGenerator finish, and then we show "Declare Winner" buttons below the story?
        // For now, let's just log it.
        console.log("Story generated for match", activeMatch);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if modal is open or typing in input
            if (editingFighter || (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

            if (e.key === 'j' || e.key === 'ArrowRight') {
                // Validation logic
                setFocusedIndex(prev => Math.min(prev + 1, selectedFighters.length - 1));
            } else if (e.key === 'k' || e.key === 'ArrowLeft') {
                // Validation logic
                setFocusedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === ' ') {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [editingFighter]);

    const handleUpdateFighter = (updatedFighter: Fighter) => {
        setFighters(fighters.map(f => f.id === updatedFighter.id ? updatedFighter : f));
        setSelectedFighters(selectedFighters.map(f => f.id === updatedFighter.id ? updatedFighter : f));
        // Update active match fighters if needed
        if (activeMatch) {
            if (activeMatch.fighter1Id === updatedFighter.id) {
                setActiveMatch((prev: any) => ({ ...prev, fighter1: updatedFighter }));
            } else if (activeMatch.fighter2Id === updatedFighter.id) {
                setActiveMatch((prev: any) => ({ ...prev, fighter2: updatedFighter }));
            }
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to start a new tournament? All current fighter progress will be archived.')) return;

        try {
            await fetch('/api/tournament/current', { method: 'POST' });
            window.location.reload();
        } catch (e) {
            alert('Failed to reset tournament');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Grind Fighter Stories</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Interactive Tournament Chronicles powered by Claude</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleReset}
                            className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline"
                        >
                            Reset Data
                        </button>
                        <Link
                            href="/history"
                            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                        >
                            View History
                        </Link>
                        <ThemeToggle />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <section>
                            <TournamentBracket
                                fighters={fighters}
                                matches={matches}
                                onMatchClick={handleMatchClick}
                            />
                        </section>

                        {/* Active Match / Generaton Section */}
                        <section ref={el => { if (activeMatch && el) el.scrollIntoView({ behavior: 'smooth' }) }}>
                            {selectedFighters.length > 0 && (
                                <StoryGenerator
                                    selectedFighters={selectedFighters}
                                    onClear={() => {
                                        setSelectedFighters([]);
                                        setActiveMatch(null);
                                    }}
                                    activeMatch={activeMatch}
                                    onResolve={async (winnerId, story) => {
                                        if (!activeMatch) return;
                                        await fetch('/api/matches/resolve', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                matchId: activeMatch.id,
                                                winnerId,
                                                storyContent: story,
                                                type: 'fight'
                                            })
                                        });
                                        // Refresh data
                                        window.location.reload();
                                    }}
                                />
                            )}
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Fighter Roster</h2>
                            <div className="h-[600px] overflow-y-auto space-y-4 pr-2">
                                {fighters.map((fighter, index) => (
                                    <FighterCard
                                        key={fighter.id}
                                        fighter={fighter}
                                        isSelected={selectedFighters.some(f => f.id === fighter.id)}
                                        onEdit={() => setEditingFighter(fighter)}
                                        onClick={() => {
                                            // Optional: Allow manual selection for non-tournament stories
                                            // toggleFighterSelection(fighter);
                                        }}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                <FighterEditor
                    fighter={editingFighter}
                    isOpen={!!editingFighter}
                    onClose={() => setEditingFighter(null)}
                    onSave={handleUpdateFighter}
                />
            </div>
        </main>
    );
}
