import { drizzle } from "drizzle-orm/node-postgres";
import { taskEntryTable, taskTable } from "./schema";
import { v4 as uuid } from "uuid";
import { eq, desc } from "drizzle-orm";
import { TaskData, TaskEntryData } from "../api/task/save";

let db: ReturnType<typeof drizzle> | null = null;

export function useDb() {
	const dbUrl = useRuntimeConfig().databaseUrl;
	if (!dbUrl) {
		throw new Error("Missing database URL");
	}

	if (!db) {
		db = drizzle(dbUrl);
	}

	return db;
}

export async function getTaskEntries() {
	const taskEntries = await useDb()
		.select()
		.from(taskEntryTable)
		.leftJoin(
			taskTable, 
			eq(taskEntryTable.taskId, taskTable.taskId))
				.orderBy(desc(taskEntryTable.startedAt));
				
	return taskEntries;
}

// export async function getTasks() {
// 	const tasks = await useDb()
// 		.select()
// 		.from(taskTable)
// 		.leftJoin(taskEntryTable, eq(taskTable.taskId, taskEntryTable.taskId))
// 		.orderBy(desc(taskEntryTable.startedAt));
		
// 	const result = tasks.reduce<{taskId: string, description: string, entries: any[]}[]>(
// 		(acc, curr) => {
// 		const task = acc.find((t) => t.taskId === curr.task.taskId);
// 		if (task) {
// 			task.entries.push(curr.task_entry);
// 		} else {
// 			acc.push({ taskId: curr.task.taskId, description: curr.task.description, entries: [curr.task_entry] });
// 		}
// 		return acc;
// 	}, []);

// 	const filteredResult = result.filter((task) => task.entries.some((entry) => entry !== null));

// 	return filteredResult;
// }

export async function createTaskEntry(taskEntryData: TaskEntryData) {
	if (taskEntryData.taskId == null) {
		throw new Error("Task ID is required");
	}

	await useDb()
		.insert(taskEntryTable)
		.values({
			taskEntryId: taskEntryData.taskEntryId ?? uuid(),
			taskId: taskEntryData.taskId,
			startedAt: taskEntryData.startedAt,
			endedAt: taskEntryData.endedAt,
		});
}

export async function updateTaskEntry(taskEntryData: TaskEntryData) {
	if (taskEntryData.taskEntryId == null) {
		throw new Error("Task Entry ID is required");
	}

	if (taskEntryData.taskId == null) {
		throw new Error("Task ID is required");
	}
	
	await useDb()
		.update(taskEntryTable)
		.set({
			taskId: taskEntryData.taskId,
			startedAt: taskEntryData.startedAt,
			endedAt: taskEntryData.endedAt,
		})
		.where(
			eq(taskEntryTable.taskEntryId, taskEntryData.taskEntryId)
		);
}

export async function createTask(taskData: TaskData & { description: string | null }) {
	if (taskData.description == null) {
		throw new Error("Description is required");
	}

	return await useDb()
		.insert(taskTable)
		.values({
			taskId: taskData.taskId ?? uuid(),
			description: taskData.description,
		})
		.returning({ taskId: taskTable.taskId });
}
