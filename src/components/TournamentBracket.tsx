import { Fighter } from '@/types/fighter';

interface Match {
    id: number;
    round: number;
    matchOrder: number;
    fighter1Id: number;
    fighter2Id: number;
    winnerId?: number;
}

interface TournamentBracketProps {
    fighters: Fighter[];
    matches: Match[];
    onMatchClick: (match: Match) => void;
}

export function TournamentBracket({ fighters, matches, onMatchClick }: TournamentBracketProps) {
    // Group matches by round
    const rounds: Record<number, Match[]> = {};
    matches.forEach(m => {
        if (!rounds[m.round]) rounds[m.round] = [];
        rounds[m.round].push(m);
    });

    const roundNumbers = Object.keys(rounds).map(Number).sort((a, b) => a - b);

    const getFighter = (id: number) => fighters.find(f => Number(f.id) === id);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tournament Bracket</h2>
            <div className="flex gap-8 min-w-max pb-4">
                {roundNumbers.map(roundNum => (
                    <div key={roundNum} className="flex flex-col gap-4 w-64">
                        <h3 className="text-center font-bold text-gray-500 dark:text-gray-400 uppercase text-sm tracking-wider mb-2">
                            Round {roundNum}
                        </h3>
                        {rounds[roundNum].map(match => {
                            const f1 = getFighter(match.fighter1Id);
                            const f2 = getFighter(match.fighter2Id);
                            const isClickable = f1 && f2 && !match.winnerId;

                            return (
                                <div
                                    key={match.id}
                                    onClick={() => isClickable && onMatchClick(match)}
                                    className={`
                                        border rounded-md p-2 bg-gray-50 dark:bg-gray-900 transition-all
                                        ${isClickable ? 'cursor-pointer hover:border-indigo-500 hover:shadow-md' : 'opacity-80'}
                                        ${match.winnerId ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-700'}
                                    `}
                                >
                                    <div className={`p-1 rounded flex justify-between ${match.winnerId === match.fighter1Id ? 'bg-green-100 dark:bg-green-900/30 font-bold' : ''}`}>
                                        <span className="truncate text-sm text-gray-900 dark:text-gray-100">{f1?.name || 'TBD'}</span>
                                    </div>
                                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2" />
                                    <div className={`p-1 rounded flex justify-between ${match.winnerId === match.fighter2Id ? 'bg-green-100 dark:bg-green-900/30 font-bold' : ''}`}>
                                        <span className="truncate text-sm text-gray-900 dark:text-gray-100">{f2?.name || 'TBD'}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
