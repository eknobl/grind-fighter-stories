import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/wiki';
import WikiLayout from '@/components/wiki/WikiLayout';
import WikiSidebar from '@/components/wiki/WikiSidebar';
import WikiArticleView from '@/components/wiki/WikiArticle';
import Link from 'next/link';
import type { Metadata } from 'next';

interface WikiArticlePageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: WikiArticlePageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) return { title: 'NOT FOUND — NEURONOMICON WIKI' };
    return {
        title: `${article.frontmatter.title.toUpperCase()} — NEURONOMICON WIKI`,
        description: article.frontmatter.description,
    };
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const allArticles = await getAllArticles();
    const currentIndex = allArticles.findIndex(a => a.slug === slug);
    const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

    const breadcrumb = [
        { label: 'ARCHIVE', href: '/wiki' },
        { label: article.frontmatter.category.toUpperCase(), href: `/wiki?category=${article.frontmatter.category}` },
        { label: article.frontmatter.title.toUpperCase() },
    ];

    const sidebar = (
        <WikiSidebar
            currentSlug={slug}
            category={article.frontmatter.category}
            relatedSlugs={article.frontmatter.related ?? []}
        />
    );

    return (
        <>
            <style>{`
        /* Scanlines + vignette for article pages */
        .wiki-article-page {
          min-height: 100vh;
          background: #050505;
          position: relative;
          overflow: hidden;
        }
        .wiki-article-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.05) 2px,
            rgba(0,0,0,0.05) 4px
          );
          pointer-events: none;
          z-index: 0;
        }
        .wiki-article-page::after {
          content: '';
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
          pointer-events: none;
          z-index: 0;
        }
        .wiki-article-page > * {
          position: relative;
          z-index: 1;
        }
        .wiki-article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
          align-items: center;
        }
        .wiki-article-reading-time {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.3);
        }
        .wiki-article-tag {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 1px;
          color: rgba(232,232,232,0.4);
          border: 1px solid rgba(232,232,232,0.12);
          padding: 2px 6px;
          border-radius: 1px;
        }
        .wiki-article-series {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 2px 8px;
          border-radius: 1px;
          border: 1px solid;
        }
        .wiki-footer-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .wiki-nav-link {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px 18px;
          border: 1px solid rgba(232,232,232,0.07);
          border-radius: 2px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          background: rgba(10,10,10,0.4);
        }
        .wiki-nav-link:hover {
          border-color: rgba(232,232,232,0.15);
          background: rgba(10,10,10,0.7);
        }
        .wiki-nav-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(232,232,232,0.25);
          text-transform: uppercase;
        }
        .wiki-nav-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 0.8rem;
          color: #e8e8e8;
        }
        .wiki-nav-link.next { text-align: right; }
      `}</style>

            <div className="wiki-article-page">
                <WikiLayout breadcrumb={breadcrumb} sidebar={sidebar}>
                    {/* Article meta */}
                    <div className="wiki-article-meta">
                        <span className="wiki-article-reading-time">{article.readingTime}</span>
                        {article.frontmatter.series && (
                            <span
                                className="wiki-article-series"
                                style={{
                                    color: article.frontmatter.series === 'grind-fighter' ? '#ff8c42'
                                        : article.frontmatter.series === 'star-wyrms' ? '#4fc3f7'
                                            : '#e8e8e8',
                                    borderColor: article.frontmatter.series === 'grind-fighter' ? '#ff8c4260'
                                        : article.frontmatter.series === 'star-wyrms' ? '#4fc3f760'
                                            : '#e8e8e860',
                                }}
                            >
                                {article.frontmatter.series}
                            </span>
                        )}
                        {article.frontmatter.tags?.map(tag => (
                            <span key={tag} className="wiki-article-tag">{tag}</span>
                        ))}
                    </div>

                    {/* MDX content */}
                    <WikiArticleView
                        content={article.content}
                        isStub={article.frontmatter.status === 'stub'}
                    />

                    {/* Footer prev/next nav */}
                    <nav className="wiki-footer-nav" aria-label="Article navigation">
                        {prevArticle ? (
                            <Link href={`/wiki/${prevArticle.slug}`} className="wiki-nav-link prev">
                                <span className="wiki-nav-label">← Previous</span>
                                <span className="wiki-nav-title">{prevArticle.frontmatter.title}</span>
                            </Link>
                        ) : <div />}
                        {nextArticle ? (
                            <Link href={`/wiki/${nextArticle.slug}`} className="wiki-nav-link next">
                                <span className="wiki-nav-label">Next →</span>
                                <span className="wiki-nav-title">{nextArticle.frontmatter.title}</span>
                            </Link>
                        ) : <div />}
                    </nav>
                </WikiLayout>
            </div>
        </>
    );
}
