#!/usr/bin/env node
/**
 * sync-wiki.js
 *
 * Watches ObsidianVault/Neuronomicon/Wiki/ for new or changed .md files
 * and copies them into content/wiki/ as .mdx files.
 *
 * Usage:
 *   node scripts/sync-wiki.js          # watch mode (keeps running)
 *   node scripts/sync-wiki.js --once   # single sync, then exit
 *
 * The source folder is: ~/Desktop/ObsidianVault/Neuronomicon/Wiki/
 * Drop any .md file there in Obsidian → it appears at /wiki/<slug> on next rebuild.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const SOURCE_DIR = path.join(os.homedir(), 'Desktop', 'ObsidianVault', 'Neuronomicon', 'Wiki');
const DEST_DIR = path.resolve(process.cwd(), 'content', 'wiki');
const ONCE = process.argv.includes('--once');

// ── Helpers ────────────────────────────────────────────────────────────────

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

function destPath(sourceFile) {
    const base = path.basename(sourceFile, path.extname(sourceFile));
    return path.join(DEST_DIR, `${slugify(base)}.mdx`);
}

/**
 * Ensures the file has valid frontmatter.
 * If not, prepends a minimal stub so it won't crash the MDX renderer.
 */
function ensureFrontmatter(content, filename) {
    if (content.trimStart().startsWith('---')) return content; // already has it

    const title = path.basename(filename, path.extname(filename));
    const stub = `---
title: "${title}"
category: lore
tags: []
description: ""
status: stub
---

`;
    console.log(`  ⚠  No frontmatter found — prepending stub header.`);
    return stub + content;
}

function syncFile(sourceFile) {
    if (!['.md', '.mdx'].includes(path.extname(sourceFile))) return;

    const dest = destPath(sourceFile);
    const raw = fs.readFileSync(sourceFile, 'utf-8');
    const out = ensureFrontmatter(raw, sourceFile);

    fs.writeFileSync(dest, out, 'utf-8');
    console.log(`  ✓  ${path.basename(sourceFile)}  →  ${path.relative(process.cwd(), dest)}`);
}

function syncAll() {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`\n✗ Source folder not found:\n  ${SOURCE_DIR}\n`);
        console.error(`Create the folder in your Obsidian Vault at:\n  Neuronomicon/Wiki/\n`);
        process.exit(1);
    }

    fs.mkdirSync(DEST_DIR, { recursive: true });

    const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.mdx?$/.test(f));
    if (files.length === 0) {
        console.log('  (no .md files found in source folder)');
        return;
    }
    files.forEach(f => syncFile(path.join(SOURCE_DIR, f)));
}

// ── Main ───────────────────────────────────────────────────────────────────

console.log('\n📡  Neuronomicon Wiki Sync');
console.log(`    source : ${SOURCE_DIR}`);
console.log(`    dest   : ${DEST_DIR}\n`);

// Initial sync
console.log('── Initial sync ──────────────────────────────────');
syncAll();

if (ONCE) {
    console.log('\nDone.\n');
    process.exit(0);
}

// Watch mode
console.log('\n── Watching for changes (Ctrl+C to stop) ─────────');
fs.watch(SOURCE_DIR, { persistent: true }, (event, filename) => {
    if (!filename || !/\.mdx?$/.test(filename)) return;
    const full = path.join(SOURCE_DIR, filename);

    // Small debounce — Obsidian writes rapidly on save
    setTimeout(() => {
        if (!fs.existsSync(full)) {
            console.log(`  ✗  Deleted: ${filename} (not removing from dest)`);
            return;
        }
        console.log(`  ↺  Changed: ${filename}`);
        syncFile(full);
    }, 200);
});
