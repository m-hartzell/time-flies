import { getTaskEntries } from "~~/server/service/task-service";

export default defineEventHandler(async (event) => {
	const tasks = await getTaskEntries();
	return tasks;
});