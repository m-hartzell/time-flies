import { getTasksEntities } from "../db";
import Task from "../../models/Task";
import TaskEntry from "../../models/TaskEntry";

export async function getTasks() {
	const entities = await getTasksEntities();

	return entities.map(entity => {
		return new Task(entity.taskId, entity.description, entity.entries.filter(entry => entry).map(entry => {
			return new TaskEntry(entry.taskEntryId, entity.taskId, entry.startedAt, entry.endedAt);
		}));
	});
}
