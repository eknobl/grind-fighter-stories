import Link from 'next/link';
import React from 'react';

const mdxStyles = `
  .wiki-body {
    color: #c8c8c8;
    font-size: 16px;
    line-height: 1.8;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .wiki-body h1 {
    font-family: var(--font-orbitron), sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.06em;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 24px;
    padding-bottom: 12px;
    margin-top: 0;
  }
  .wiki-body h2 {
    font-family: var(--font-orbitron), sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.04em;
    margin-top: 48px;
    margin-bottom: 16px;
  }
  .wiki-body h3 {
    font-family: var(--font-mono-nmc), monospace;
    font-size: 1rem;
    color: rgba(232,232,232,0.7);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 32px;
    margin-bottom: 12px;
  }
  .wiki-body h4 {
    font-family: var(--font-mono-nmc), monospace;
    font-size: 0.85rem;
    color: rgba(232,232,232,0.55);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 8px;
  }
  .wiki-body p {
    margin-bottom: 20px;
    margin-top: 0;
  }
  .wiki-body a {
    color: rgba(232,232,232,0.65);
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .wiki-body a:hover {
    color: #ffffff;
  }
  .wiki-body a[href^="/wiki"]::before {
    content: "› ";
    opacity: 0.6;
  }
  .wiki-body blockquote {
    border-left: 2px solid rgba(255,255,255,0.2);
    padding-left: 20px;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: rgba(232,232,232,0.55);
  }
  .wiki-body code:not(pre > code) {
    font-family: var(--font-mono-nmc), monospace;
    font-size: 13px;
    background: rgba(255,255,255,0.06);
    padding: 2px 6px;
    border-radius: 2px;
  }
  .wiki-body pre {
    background: #0a0a0a;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 20px;
    overflow-x: auto;
    border-radius: 2px;
    margin-bottom: 20px;
  }
  .wiki-body pre code {
    font-family: var(--font-mono-nmc), monospace;
    font-size: 13px;
    background: none;
    padding: 0;
  }
  .wiki-body ul {
    padding-left: 24px;
    margin-bottom: 20px;
    list-style: none;
  }
  .wiki-body ul > li {
    position: relative;
    margin-bottom: 8px;
  }
  .wiki-body ul > li::before {
    content: "›";
    position: absolute;
    left: -18px;
    color: rgba(232,232,232,0.4);
  }
  .wiki-body ol {
    padding-left: 24px;
    margin-bottom: 20px;
  }
  .wiki-body ol > li {
    margin-bottom: 8px;
  }
  .wiki-body hr {
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(232,232,232,0.3), transparent);
    margin: 40px 0;
  }
  .wiki-body table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .wiki-body th {
    background: rgba(255,255,255,0.05);
    color: rgba(232,232,232,0.8);
    font-family: var(--font-mono-nmc), monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 10px 14px;
    border: 1px solid rgba(255,255,255,0.08);
    text-align: left;
  }
  .wiki-body td {
    padding: 9px 14px;
    border: 1px solid rgba(255,255,255,0.08);
    color: #c8c8c8;
  }
  .wiki-body tr:nth-child(even) td {
    background: rgba(255,255,255,0.02);
  }
`;

export const components = {
    h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 {...props} />,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 {...props} />,
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h4 {...props} />,
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />,
    a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        href?.startsWith('/') ? (
            <Link href={href} {...props} />
        ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
        )
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote {...props} />,
    code: (props: React.HTMLAttributes<HTMLElement>) => <code {...props} />,
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul {...props} />,
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol {...props} />,
    li: (props: React.HTMLAttributes<HTMLLIElement>) => <li {...props} />,
    hr: () => <hr />,
    table: (props: React.HTMLAttributes<HTMLTableElement>) => <table {...props} />,
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => <th {...props} />,
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => <td {...props} />,
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />,
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />,
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
};

export function MDXStyles() {
    return <style>{mdxStyles}</style>;
}
