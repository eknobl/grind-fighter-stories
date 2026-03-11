import { pgTable, text, serial, jsonb, timestamp, integer, boolean, doublePrecision, bigint, index, uuid } from 'drizzle-orm/pg-core';

export const tournaments = pgTable('tournaments', {
    id: serial('id').primaryKey(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const fighters = pgTable('fighters', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    data: jsonb('data').notNull(), // Stores the full fighter object
    tournamentId: integer('tournament_id').references(() => tournaments.id),
    status: text('status').default('active'), // active, eliminated, winner
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const matches = pgTable('matches', {
    id: serial('id').primaryKey(),
    tournamentId: integer('tournament_id').references(() => tournaments.id),
    round: integer('round').notNull(), // 1, 2, 3...
    matchOrder: integer('match_order').notNull(), // 0 to N-1
    fighter1Id: integer('fighter1_id').references(() => fighters.id),
    fighter2Id: integer('fighter2_id').references(() => fighters.id),
    winnerId: integer('winner_id').references(() => fighters.id),
    storyId: integer('story_id').references(() => stories.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const stories = pgTable('stories', {
    id: serial('id').primaryKey(),
    type: text('type').notNull(),
    content: text('content').notNull(),
    fighterIds: text('fighter_ids').array(), // Store IDs of fighters in the story
    tournamentId: integer('tournament_id').references(() => tournaments.id),
    rating: text('rating'), // 'up' or 'down'
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const ringUsers = pgTable('ring_users', {
    id:          uuid('id').primaryKey().defaultRandom(),
    githubId:    bigint('github_id', { mode: 'number' }).unique().notNull(),
    username:    text('username').notNull(),
    avatarUrl:   text('avatar_url'),
    ringAngle:   doublePrecision('ring_angle').notNull(),
    repoCount:   integer('repo_count').default(0),
    starCount:   integer('star_count').default(0),
    topLanguage: text('top_language'),
    arcStart:    doublePrecision('arc_start'),
    arcEnd:      doublePrecision('arc_end'),
    claimed:     boolean('claimed').default(false).notNull(),
    lastSynced:  timestamp('last_synced', { withTimezone: true }).defaultNow(),
    joinedAt:    timestamp('joined_at', { withTimezone: true }).defaultNow(),
}, (table) => ({
    angleIdx: index('ring_users_angle_idx').on(table.ringAngle),
}));
