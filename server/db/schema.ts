import { relations } from "drizzle-orm";
import { date, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const taskTable = pgTable("task", {
	taskId: uuid("task_id").primaryKey(),
	description: varchar("description", { length: 500 }).notNull(),
});

export const taskRelations = relations(taskTable, ({ many }) => ({
	entries: many(taskEntryTable),
}));

export const taskEntryTable = pgTable("task_entry", {
	taskEntryId: uuid("task_entry_id").primaryKey(),
	taskId: uuid("task_id").notNull().references(() => taskTable.taskId),
	startedAt: date("started_at").notNull(),
	endedAt: date("ended_at"),
});

export const taskEntryRelations = relations(taskEntryTable, ({ one }) => ({
	task: one(taskTable, {
		fields: [taskEntryTable.taskId],
		references: [taskTable.taskId],
	}),
}));
