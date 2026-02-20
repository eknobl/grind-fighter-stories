import { db } from '@/db';
import { stories } from '@/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

// This forces the page to be dynamic so it fetches fresh data on request
export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
    let storyList: typeof stories.$inferSelect[] = [];
    let dbError = null;

    try {
        storyList = await db.select().from(stories).orderBy(desc(stories.createdAt));
    } catch (error) {
        console.error('Failed to fetch stories:', error);
        dbError = 'Could not connect to database. Please check your configuration.';
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <div>
                        <div className="flex items-center gap-4">
                            <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                                &larr; Back to Generator
                            </Link>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Story History</h1>
                        </div>
                    </div>
                    <ThemeToggle />
                </header>

                {dbError && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        {dbError}
                    </div>
                )}

                <div className="grid gap-6">
                    {storyList.length === 0 && !dbError && (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                            No stories generated yet. Go back and create some!
                        </div>
                    )}

                    {storyList.map((story) => (
                        <article key={story.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-800 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 rounded mb-2">
                                        {story.type}
                                    </span>
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        Date: {story.createdAt ? new Date(story.createdAt).toLocaleString() : 'Just now'}
                                    </h2>
                                </div>
                            </div>
                            <div className="prose prose-sm prose-indigo dark:prose-invert max-w-none font-serif text-gray-700 dark:text-gray-300 line-clamp-6 hover:line-clamp-none transition-all">
                                {story.content}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
