import { getTasks } from "~~/server/service/task-service";

export default defineEventHandler(async (event) => {
	const tasks = await getTasks();
	return tasks;
});