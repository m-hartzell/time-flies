import { saveTaskEntry } from "~~/server/service/task-service";

export interface TaskEntryData {
	taskEntryId: string | null;
	taskId: string | null;
	startedAt: string;
	endedAt: string | null;
	description: string | null;
}

export interface TaskData {
	taskId: string | null;
	description: string;
}

export default defineEventHandler(async (event) => {
	const body = await readBody<TaskEntryData>(event);
	await saveTaskEntry(body);
});