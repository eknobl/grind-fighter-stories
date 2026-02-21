'use client';

import { useState, useEffect } from 'react';
import { Fighter, Species, FightingStyle, OriginWorld, OrgAffiliation, BaseStats } from '../types/fighter';

interface FighterEditorProps {
    fighter: Fighter | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedFighter: Fighter) => void;
}

const SPECIES: Species[] = ['Human', 'Cyborg', 'Android'];
const STYLES: FightingStyle[] = ['Aggressive', 'Defensive', 'Balanced', 'Tactical', 'Stealth', 'Brutal', 'Evasive', 'Technical'];
const WORLDS: OriginWorld[] = [
    'Neon City', 'The Sprawl', 'Irongate', 'Meridian Station', 'Ashveil',
    'The Undercroft', 'Helios Prime', 'Coldharbor', 'Vertex', 'The Fringe',
    'Liminal', 'Crimson Basin', 'Sector Zero', 'Drift', 'New Arcadia',
    'Vantablack', 'The Nexus', 'Obsidian Shore', 'Rust Belt', 'Cauldron'
];
const ORGS: OrgAffiliation[] = [
    'Acheron', 'Minos', 'Cerberus', 'Lethe', 'Dis',
    'Stygia', 'Malebolge', 'Cain', 'Tartarus', 'Unaligned'
];

const STAT_KEYS: (keyof BaseStats)[] = ['strength', 'dexterity', 'endurance', 'logic', 'instinct', 'willpower'];
const STAT_LABELS: Record<keyof BaseStats, string> = {
    strength: 'STR', dexterity: 'DEX', endurance: 'END',
    logic: 'LOG', instinct: 'INS', willpower: 'WIL'
};

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
            // Recompute derived values
            const hp = editedFighter.stats.endurance * 2;
            const mp = editedFighter.stats.willpower * 2;
            onSave({ ...editedFighter, hp, mp });
            onClose();
        }
    };

    const handleStatChange = (stat: keyof BaseStats, value: string) => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 10 && numValue <= 26) {
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Edit Fighter</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Identity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                value={editedFighter.name}
                                onChange={(e) => setEditedFighter({ ...editedFighter, name: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Species</label>
                            <select
                                value={editedFighter.species}
                                onChange={(e) => setEditedFighter({ ...editedFighter, species: e.target.value as Species })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                {SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Origin</label>
                            <select
                                value={editedFighter.origin}
                                onChange={(e) => setEditedFighter({ ...editedFighter, origin: e.target.value as OriginWorld })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                {WORLDS.map(w => <option key={w} value={w}>{w}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Org Affiliation</label>
                            <select
                                value={editedFighter.org}
                                onChange={(e) => setEditedFighter({ ...editedFighter, org: e.target.value as OrgAffiliation })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                {ORGS.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fighting Style</label>
                            <select
                                value={editedFighter.fightingStyle}
                                onChange={(e) => setEditedFighter({ ...editedFighter, fightingStyle: e.target.value as FightingStyle })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            >
                                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Signature Move</label>
                            <input
                                type="text"
                                value={editedFighter.signatureMove}
                                onChange={(e) => setEditedFighter({ ...editedFighter, signatureMove: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    {/* Stats — range 10–26 */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                            Stats (base 10, max 26 with Humanware)
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {STAT_KEYS.map((stat) => (
                                <div key={stat}>
                                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                                        {STAT_LABELS[stat]}
                                    </label>
                                    <input
                                        type="number"
                                        min="10"
                                        max="26"
                                        value={editedFighter.stats[stat]}
                                        onChange={(e) => handleStatChange(stat, e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-2 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-center"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                            HP: {editedFighter.stats.endurance * 2} · MP: {editedFighter.stats.willpower * 2}
                        </p>
                    </div>

                    {/* Narrative */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Backstory</label>
                            <textarea
                                rows={3}
                                value={editedFighter.backstory}
                                onChange={(e) => setEditedFighter({ ...editedFighter, backstory: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Motivation</label>
                            <input
                                type="text"
                                value={editedFighter.motivation}
                                onChange={(e) => setEditedFighter({ ...editedFighter, motivation: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Personality</label>
                            <input
                                type="text"
                                value={editedFighter.personality}
                                onChange={(e) => setEditedFighter({ ...editedFighter, personality: e.target.value })}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
