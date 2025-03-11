import { TaskGroup } from "@domain/entities/TaskGroup";

type ITaskState = "TODO" | "IN_PROGRESS" | "DONE";

type ITaskProps = {
  id?: string;
  title: string;
  description?: string;
  state?: ITaskState;
  createdAt?: Date;
  updatedAt?: Date;
  isCompleted?: boolean;
  taskGroup?: TaskGroup;
};

class Task {
  private readonly _id?: string;
  private readonly _title: string;
  private readonly _description?: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;
  private _state: ITaskState;
  private _isCompleted: boolean;
  private readonly _taskGroup?: TaskGroup;

  constructor(props: ITaskProps) {
    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._state = props.state ?? "TODO";
    this._isCompleted = props.isCompleted ?? false;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._taskGroup = props.taskGroup;
  }

  public get id(): string | undefined {
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

  public get createdAt(): Date | undefined {
    return this._createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
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
