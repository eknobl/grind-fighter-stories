import { Fighter } from '../types/fighter';

interface FighterCardProps {
    fighter: Fighter;
    onClick?: (fighter: Fighter) => void;
    onEdit?: (fighter: Fighter) => void;
    isSelected?: boolean;
}

export function FighterCard({ fighter, onClick, onEdit, isSelected }: FighterCardProps) {
    return (
        <div
            className={`border rounded-lg p-4 transition-all hover:shadow-lg relative group ${isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-800'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
        >
            <div
                onClick={() => onClick && onClick(fighter)}
                className="cursor-pointer"
            >
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{fighter.name}</h3>
                    <div className="flex gap-2">
                        <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                            #{fighter.rank}
                        </span>
                    </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><span className="font-semibold text-gray-700 dark:text-gray-300">Species:</span> {fighter.species}</p>
                    <p><span className="font-semibold text-gray-700 dark:text-gray-300">Origin:</span> {fighter.origin}</p>
                    <p><span className="font-semibold text-gray-700 dark:text-gray-300">Style:</span> {fighter.fightingStyle}</p>
                    <p><span className="font-semibold text-gray-700 dark:text-gray-300">Signature:</span> {fighter.signatureMove}</p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex justify-between">
                        <span>STR:</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${fighter.stats.strength * 10}%` }}></div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>AGI:</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${fighter.stats.agility * 10}%` }}></div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>INT:</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${fighter.stats.intelligence * 10}%` }}></div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span>END:</span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${fighter.stats.endurance * 10}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {onEdit && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(fighter);
                    }}
                    className="absolute top-2 right-14 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Edit Fighter"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            )}
        </div>
    );
}
