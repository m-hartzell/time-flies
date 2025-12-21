import TaskEntry from './TaskEntry';

export default class Task {
	public isActive: boolean;

	private _taskId: string;
	private _description: string;
	private _taskEntries: TaskEntry[] = [];
	
	get taskId(): string {
		return this._taskId;
	}

	get description(): string {
		return this._description;
	}

	get taskEntries(): TaskEntry[] {
		return this._taskEntries;
	}

	constructor(
		taskId: string,
		description: string,
		taskEntries: TaskEntry[] = []
	) {
		this._taskId = taskId;
		this._description = description;
		this._taskEntries = taskEntries;
		this.isActive = this.taskEntries.some(entry => entry.endedAt == null);
	}
}
