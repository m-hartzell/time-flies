import { drizzle } from "drizzle-orm/node-postgres";
import { taskEntryTable, taskTable } from "./schema";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

const db = drizzle(useRuntimeConfig().databaseUrl);

// export async function addTask(description: string) {
// 	return db.insert(taskTable).values({ taskId: uuid(), description });
// }

// export async function addTaskEntry(taskId: string, startedAt: Date, endedAt?: Date) {
// 	return db.insert(taskEntryTable).values({ taskEntryId: uuid(), taskId, startedAt, endedAt });
// }

export async function getTasksEntities() {
	const tasks = await db.select().from(taskTable).leftJoin(taskEntryTable, eq(taskTable.taskId, taskEntryTable.taskId));
	const result = tasks.reduce<{taskId: string, description: string, entries: any[]}[]>(
		(acc, curr) => {
		const task = acc.find((t) => t.taskId === curr.task.taskId);
		if (task) {
			task.entries.push(curr.task_entry);
		} else {
			acc.push({ taskId: curr.task.taskId, description: curr.task.description, entries: [curr.task_entry] });
		}
		return acc;
	}, []);

	return result;
}


//   {
//     time: '9:31am',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     active: true,
//     category: 'Project',
//     startTime: null
//   },
//   {
//     time: '8:57am',
//     description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     active: false,
//     category: 'Meeting',
//     startTime: null
//   },
//   {
//     time: '8:23am',
//     description: 'Aenean euismod',
//     active: false,
//     category: 'Project',
//     startTime: null
//   },
//   {
//     time: '7:34am',
//     description: 'Quisque ut mauris euismod, gravida nunc non, cursus erat.',
//     active: false,
//     category: 'Project',
//     startTime: null
//   },
