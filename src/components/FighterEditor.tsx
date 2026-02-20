'use client';

import { useState, useEffect } from 'react';
import { Fighter, Species, FightingStyle, OriginWorld, Stats } from '../types/fighter';

interface FighterEditorProps {
    fighter: Fighter | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedFighter: Fighter) => void;
}

const SPECIES: Species[] = ['Human', 'Elf', 'Dwarf', 'Orc', 'Goblin', 'Troll', 'Dragonborn'];
const STYLES: FightingStyle[] = ['Aggressive', 'Defensive', 'Balanced', 'Tactical', 'Magical', 'Stealth', 'Brutal', 'Evasive', 'Technical'];
const WORLDS: OriginWorld[] = ['Terra', 'Aetheria', 'Inferno', 'Celestia', 'Shadowreaver', 'Mechanus', 'Verdant', 'Aquatica', 'Frostholm', 'Sandstorm', 'Ironclad', 'Mistvale', 'Stormpeak', 'Void', 'Elysium', 'Tartarus', 'Nether', 'Gaia', 'Olympus', 'Asgard'];

export function FighterEditor({ fighter, isOpen, onClose, onSave }: FighterEditorProps) {
    const [editedFighter, setEditedFighter] = useState<Fighter | null>(null);

    useEffect(() => {
        if (fighter) {
            setEditedFighter({ ...fighter });
        }
    }, [fighter]);

    if (!isOpen || !editedFighter) return null;

    const handleSave = () => {
        if (editedFighter) {
            onSave(editedFighter);
            onClose();
        }
    };

    const handleStatChange = (stat: keyof Stats, value: string) => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
            setEditedFighter({
                ...editedFighter,
                stats: {
                    ...editedFighter.stats,
                    [stat]: numValue,
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Fighter</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={editedFighter.name}
                                onChange={(e) => setEditedFighter({ ...editedFighter, name: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                            <select
                                value={editedFighter.species}
                                onChange={(e) => setEditedFighter({ ...editedFighter, species: e.target.value as Species })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Origin World</label>
                            <select
                                value={editedFighter.origin}
                                onChange={(e) => setEditedFighter({ ...editedFighter, origin: e.target.value as OriginWorld })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {WORLDS.map(w => <option key={w} value={w}>{w}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fighting Style</label>
                            <select
                                value={editedFighter.fightingStyle}
                                onChange={(e) => setEditedFighter({ ...editedFighter, fightingStyle: e.target.value as FightingStyle })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Signature Move</label>
                            <input
                                type="text"
                                value={editedFighter.signatureMove}
                                onChange={(e) => setEditedFighter({ ...editedFighter, signatureMove: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Stats (1-10)</h3>
                        <div className="grid grid-cols-5 gap-4">
                            {(Object.keys(editedFighter.stats) as Array<keyof Stats>).map((stat) => (
                                <div key={stat}>
                                    <label className="block text-xs font-medium text-gray-500 uppercase mb-1">{stat}</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={editedFighter.stats[stat]}
                                        onChange={(e) => handleStatChange(stat, e.target.value)}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-center"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Backstory</label>
                            <textarea
                                rows={3}
                                value={editedFighter.backstory}
                                onChange={(e) => setEditedFighter({ ...editedFighter, backstory: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Motivation</label>
                            <input
                                type="text"
                                value={editedFighter.motivation}
                                onChange={(e) => setEditedFighter({ ...editedFighter, motivation: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
                            <input
                                type="text"
                                value={editedFighter.personality}
                                onChange={(e) => setEditedFighter({ ...editedFighter, personality: e.target.value })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
