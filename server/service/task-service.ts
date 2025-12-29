import { TaskEntryData } from "../api/task/save";
import { getTaskEntries as getTaskEntriesDb, createTask as createTaskDb, createTaskEntry as createTaskEntryDb, updateTaskEntry } from "../db";

export async function getTaskEntries() {
	const entities = await getTaskEntriesDb();
	
	return entities.map(entity => ({
		taskEntryId: entity.task_entry.taskEntryId,
		taskId: entity.task_entry.taskId,
		startedAt: entity.task_entry.startedAt,
		endedAt: entity.task_entry.endedAt,
		description: entity.task?.description,
	}));
};

export async function saveTaskEntry(taskEntryData: TaskEntryData) {
	if (taskEntryData.taskId == null) {
		const newTask = await createTaskDb({
			taskId: null,
			description: taskEntryData.description
		});

		taskEntryData.taskId = newTask[0].taskId;
	}

	if (taskEntryData.taskEntryId == null) {
		await createTaskEntryDb(taskEntryData);
	} else {
		await updateTaskEntry(taskEntryData);
	}

}