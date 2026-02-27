'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { components, MDXStyles } from './mdx-components';

interface WikiArticleViewProps {
    content: string;
    isStub?: boolean;
}

export default function WikiArticleView({ content, isStub }: WikiArticleViewProps) {
    return (
        <>
            <MDXStyles />
            <style>{`
        .wiki-stub-banner {
          background: rgba(249,215,47,0.06);
          border: 1px solid rgba(249,215,47,0.25);
          border-radius: 2px;
          padding: 12px 16px;
          margin-bottom: 32px;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(249,215,47,0.7);
        }
      `}</style>

            {isStub && (
                <div className="wiki-stub-banner">
                    ⚠ STUB — This entry is incomplete. Content forthcoming.
                </div>
            )}

            <div className="wiki-body">
                <MDXRemote
                    source={content}
                    components={components}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
                        },
                    }}
                />
            </div>
        </>
    );
}
