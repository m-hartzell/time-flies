
export default class TaskEntry {
	private _taskEntryId: string;
	private _taskId: string;
	private _startedAt: Date;
	private _endedAt?: Date;

	get taskEntryId(): string {
		return this._taskEntryId;
	}

	get taskId(): string {
		return this._taskId;
	}

	get startedAt(): Date {
		return this._startedAt;
	}
	
	get endedAt(): Date | undefined {
		return this._endedAt;
	}

	constructor(
		taskEntryId: string,
		taskId: string,
		startedAt: Date,
		endedAt?: Date
	) {
		this._taskEntryId = taskEntryId;
		this._taskId = taskId;
		this._startedAt = startedAt;
		this._endedAt = endedAt;
	}
}