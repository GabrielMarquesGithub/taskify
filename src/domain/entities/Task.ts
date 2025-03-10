import { v4 as uuid } from "uuid";

import { TaskGroup } from "@domain/entities/TaskGroup";

type ITaskState = "TODO" | "IN_PROGRESS" | "DONE";

type ITaskProps = {
  id?: string;
  title: string;
  description?: string;
  state?: ITaskState;
  isCompleted?: boolean;
  taskGroup?: TaskGroup;
};

class Task {
  private readonly _id: string;
  private readonly _title: string;
  private readonly _description?: string;
  private _state: ITaskState;
  private _isCompleted: boolean;
  private readonly _taskGroup?: TaskGroup;

  constructor(props: ITaskProps) {
    this._id = props.id ?? uuid();
    this._title = props.title;
    this._description = props.description;
    this._state = props.state ?? "TODO";
    this._isCompleted = props.isCompleted ?? false;
    this._taskGroup = props.taskGroup;
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get state(): ITaskState {
    return this._state;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }
  public get taskGroup(): TaskGroup | undefined {
    return this._taskGroup;
  }

  private finish(): void {
    this._isCompleted = true;
    this._state = "DONE";
  }
}

export { Task };
