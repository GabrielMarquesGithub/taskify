import { TaskGroup } from "@domain/entities/TaskGroup.entity";

type ITaskState = "todo" | "inProgress" | "done";

class Task {
  private _id: string;
  private _title: string;
  private description?: string;
  private state: ITaskState;
  private isCompleted: boolean;
  private group?: TaskGroup;

  public get id(): string {
    return this._id;
  }

  private finish(): void {
    this.isCompleted = true;
    this.state = "done";
  }
}

export { Task };
