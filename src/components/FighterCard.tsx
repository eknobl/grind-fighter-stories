import { Fighter } from '../types/fighter';

interface FighterCardProps {
    fighter: Fighter;
    onClick?: (fighter: Fighter) => void;
    onEdit?: (fighter: Fighter) => void;
    isSelected?: boolean;
}

// Colour palette for the 9 orgs + Unaligned
const ORG_COLORS: Record<string, string> = {
    Acheron: 'bg-red-900/60 text-red-200 border-red-700',
    Minos: 'bg-amber-900/60 text-amber-200 border-amber-700',
    Cerberus: 'bg-blue-900/60 text-blue-200 border-blue-700',
    Lethe: 'bg-violet-900/60 text-violet-200 border-violet-700',
    Dis: 'bg-orange-900/60 text-orange-200 border-orange-700',
    Stygia: 'bg-teal-900/60 text-teal-200 border-teal-700',
    Malebolge: 'bg-yellow-900/60 text-yellow-200 border-yellow-700',
    Cain: 'bg-rose-900/60 text-rose-200 border-rose-700',
    Tartarus: 'bg-emerald-900/60 text-emerald-200 border-emerald-700',
    Unaligned: 'bg-gray-700/60 text-gray-300 border-gray-600',
};

const LUCK_COLORS: Record<string, string> = {
    Cursed: 'text-red-500',
    Unlucky: 'text-orange-400',
    Neutral: 'text-gray-400',
    Fortunate: 'text-emerald-400',
    Fated: 'text-purple-400',
};

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
    // Stats range from 10 (base) to ~26 (10+16 max HW). Show as % of 26.
    const pct = Math.min(100, Math.round((value / 26) * 100));
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 w-8 shrink-0">{label}</span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs font-mono text-gray-600 dark:text-gray-300 w-4 text-right">{value}</span>
        </div>
    );
}

export function FighterCard({ fighter, onClick, onEdit, isSelected }: FighterCardProps) {
    const orgColor = ORG_COLORS[fighter.org] ?? ORG_COLORS.Unaligned;
    const luckColor = LUCK_COLORS[fighter.luckLabel] ?? 'text-gray-400';

    return (
        <div
            className={`border rounded-lg p-4 transition-all hover:shadow-lg relative group ${isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-200 dark:ring-indigo-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
        >
            <div onClick={() => onClick && onClick(fighter)} className="cursor-pointer">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 leading-tight">
                            {fighter.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {fighter.species} · {fighter.origin}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                            #{fighter.rank}
                        </span>
                        <span className={`text-xs border px-1.5 py-0.5 rounded font-medium ${orgColor}`}>
                            {fighter.org}
                        </span>
                    </div>
                </div>

                {/* Style & Style Move */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex gap-2 flex-wrap">
                    <span className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{fighter.fightingStyle}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{fighter.signatureMove}</span>
                </div>

                {/* Humanware + Axis */}
                <div className="flex gap-2 mb-3 text-xs">
                    <span className={`px-2 py-0.5 rounded font-semibold border ${fighter.humanwareType === 4
                            ? 'bg-indigo-900/40 text-indigo-300 border-indigo-700'
                            : 'bg-gray-700/40 text-gray-300 border-gray-600'
                        }`}>
                        Type {fighter.humanwareType}
                    </span>
                    <span className="px-2 py-0.5 rounded border bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                        {fighter.primaryAxis}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-semibold ${luckColor}`}>
                        {fighter.luckLabel}
                    </span>
                </div>

                {/* Physical Stats */}
                <div className="mb-2">
                    <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 font-semibold">Physical · HP {fighter.hp}</p>
                    <div className="space-y-1">
                        <StatBar label="STR" value={fighter.stats.strength} color="bg-red-500" />
                        <StatBar label="DEX" value={fighter.stats.dexterity} color="bg-orange-400" />
                        <StatBar label="END" value={fighter.stats.endurance} color="bg-yellow-500" />
                    </div>
                </div>

                {/* Digital Stats */}
                <div className="mb-3">
                    <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1 font-semibold">Digital · MP {fighter.mp}</p>
                    <div className="space-y-1">
                        <StatBar label="LOG" value={fighter.stats.logic} color="bg-blue-500" />
                        <StatBar label="INS" value={fighter.stats.instinct} color="bg-violet-500" />
                        <StatBar label="WIL" value={fighter.stats.willpower} color="bg-purple-500" />
                    </div>
                </div>

                {/* Team Quality + Score */}
                <div className="flex justify-between items-center text-xs border-t border-gray-200 dark:border-gray-700 pt-2 mt-1">
                    <div className="text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-gray-700 dark:text-gray-300">TQ</span>{' '}
                        <span className="font-mono">{fighter.teamQuality}/10</span>
                        {fighter.teamNote && (
                            <span
                                className="ml-1 text-amber-500 cursor-help"
                                title={fighter.teamNote}
                            >
                                ⚠
                            </span>
                        )}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                        Score{' '}
                        <span className="font-mono font-semibold text-gray-700 dark:text-gray-200">
                            {fighter.officialScore}
                        </span>
                    </div>
                </div>
            </div>

            {/* Edit button */}
            {onEdit && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(fighter);
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Edit Fighter"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
