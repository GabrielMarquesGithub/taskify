import { TaskGroup } from "@domain/entities/TaskGroup.entity";

type ITaskState = "TODO" | "IN_PROGRESS" | "DONE";

class Task {
  private _id: string;
  private _title: string;
  private description?: string;
  private state: ITaskState;
  private isCompleted: boolean;
  private taskGroup?: TaskGroup;

  public get id(): string {
    return this._id;
  }

  private finish(): void {
    this.isCompleted = true;
    this.state = "DONE";
  }
}

export { Task };
