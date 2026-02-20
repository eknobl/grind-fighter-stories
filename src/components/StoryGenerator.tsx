'use client';

import { useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { Fighter, StoryType } from '../types/fighter';

interface StoryGeneratorProps {
    selectedFighters: Fighter[];
    onClear: () => void;
    activeMatch?: any;
    onResolve?: (winnerId: number, story: string) => void;
}

export function StoryGenerator({ selectedFighters, onClear, activeMatch, onResolve }: StoryGeneratorProps) {
    const [storyType, setStoryType] = useState<StoryType>('fight');
    const [rating, setRating] = useState<'up' | 'down' | null>(null);
    const [copied, setCopied] = useState(false);

    const { completion, complete, isLoading, error } = useCompletion({
        api: '/api/generate-story',
    });

    const handleGenerate = () => {
        if (selectedFighters.length === 0) return;
        setRating(null);
        setCopied(false);

        complete('', {
            body: {
                fighters: selectedFighters,
                type: storyType,
            },
        });
    };

    const handleRemix = (instruction: string) => {
        if (selectedFighters.length === 0) return;
        setRating(null);
        setCopied(false);

        complete('', {
            body: {
                fighters: selectedFighters,
                type: storyType,
                remix: instruction
            }
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(completion).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Story Generator</h2>
                <button
                    onClick={onClear}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 underline"
                >
                    Clear Selection
                </button>
            </div>

            <div className="mb-4">
                <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Selected: {selectedFighters.map(f => f.name).join(', ')}
                </div>

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Story Type</label>
                <select
                    value={storyType}
                    onChange={(e) => setStoryType(e.target.value as StoryType)}
                    className="w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    disabled={isLoading}
                >
                    <option value="fight">Fight Scene (2 fighters)</option>
                    <option value="rest">Rest Period (1 fighter)</option>
                    <option value="preparation">Preparation (1 fighter)</option>
                    <option value="interaction">Interaction (2 fighters)</option>
                </select>
            </div>

            <button
                onClick={handleGenerate}
                disabled={isLoading || selectedFighters.length === 0}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading || selectedFighters.length === 0
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm'
                    }`}
            >
                {isLoading ? 'Generating Story...' : 'Generate Story'}
            </button>

            {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 rounded-md border border-red-200 dark:border-red-800 flex justify-between items-center">
                    <span>Error generating story: {error.message || 'Unknown error occurred'}</span>
                    <button
                        onClick={handleGenerate}
                        className="text-sm px-3 py-1 bg-white dark:bg-red-800 border border-red-300 dark:border-red-700 rounded hover:bg-red-50 dark:hover:bg-red-700 text-red-700 dark:text-red-100 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            )}

            {isLoading && !completion && (
                <div className="mt-6 space-y-4 animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                    </div>
                </div>
            )}

            {completion && (
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-end">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Generated Story</h3>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(completion);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300 flex items-center gap-1"
                                title="Copy to clipboard"
                            >
                                {copied ? 'Copied!' : 'Copy Text'}
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setRating('up')}
                                    className={`p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors ${rating === 'up' ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 ring-1 ring-green-200 dark:ring-green-800' : 'text-gray-400 dark:text-gray-600'}`}
                                    title="Good story"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setRating('down')}
                                    className={`p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors ${rating === 'down' ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 ring-1 ring-red-200 dark:ring-red-800' : 'text-gray-400 dark:text-gray-600'}`}
                                    title="Needs improvement"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleRemix("Make it more intense and violent!")}
                                    disabled={isLoading}
                                    className="text-xs px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 disabled:opacity-50"
                                >
                                    Remix: More Intense
                                </button>
                                <button
                                    onClick={() => handleRemix("Focus more on the dialogue and character interaction.")}
                                    disabled={isLoading}
                                    className="text-xs px-3 py-1.5 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 disabled:opacity-50"
                                >
                                    Remix: Dialogue Focus
                                </button>
                            </div>
                        </div>
                    </div>

                    {activeMatch && onResolve && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-center text-lg font-bold text-gray-900 dark:text-white mb-4">Who Won?</h3>
                            <div className="flex justify-center gap-6">
                                {selectedFighters.map(f => (
                                    <button
                                        key={f.id}
                                        onClick={() => onResolve(Number(f.id), completion)}
                                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transform transition-transform hover:scale-105"
                                    >
                                        {f.name} Wins
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
