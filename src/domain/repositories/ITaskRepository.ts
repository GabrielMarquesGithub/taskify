import { Task } from "@domain/entities/Task";
import { IEntityListFilters } from "@domain/interfaces/IEntityListFilters";

export type ITaskListFilters = IEntityListFilters<
  keyof Pick<
    Task,
    "state" | "title" | "description" | "isCompleted" | "taskGroup"
  >
>;

type ITaskRepository = {
  saveTask(task: Task): Promise<Task>;
  getTaskById(id: string): Promise<Task | undefined>;
  getTasks(filters: ITaskListFilters): Promise<Task[]>;
};

export { ITaskRepository };
