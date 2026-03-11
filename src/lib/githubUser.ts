const GH_HEADERS: HeadersInit = {
    Accept: 'application/vnd.github+json',
    ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
};

export interface GitHubUserStats {
    githubId: number;
    username: string;
    avatarUrl: string;
    repoCount: number;
    starCount: number;
    topLanguage: string | null;
}

export async function fetchGitHubUserStats(username: string): Promise<GitHubUserStats> {
    const userRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`,
        { headers: GH_HEADERS }
    );

    if (!userRes.ok) {
        const statusCode = userRes.status;
        throw Object.assign(
            new Error(statusCode === 404 ? 'GitHub user not found' : 'GitHub API error'),
            { statusCode }
        );
    }

    const ghUser = await userRes.json();

    const reposRes = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        { headers: GH_HEADERS }
    );
    const repos: Array<{ stargazers_count?: number; language?: string | null }> =
        reposRes.ok ? await reposRes.json() : [];

    const starCount = Array.isArray(repos)
        ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
        : 0;

    const langCounts: Record<string, number> = {};
    if (Array.isArray(repos)) {
        for (const r of repos) {
            if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
    }
    const topLanguage =
        Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
        githubId: ghUser.id,
        username: ghUser.login,
        avatarUrl: ghUser.avatar_url,
        repoCount: ghUser.public_repos ?? 0,
        starCount,
        topLanguage,
    };
}
