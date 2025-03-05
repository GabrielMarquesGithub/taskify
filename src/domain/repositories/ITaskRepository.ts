import { Task } from "@domain/entities/Task";
import { IBaseListFilters } from "@domain/interfaces/IBaseListFilters";

type ITaskRepository = {
  saveTask(task: Task): Promise<Task>;
  getTaskById(id: string): Promise<Task | undefined>;
  getTasks(filters: IBaseListFilters): Promise<Task[]>;
};

export { ITaskRepository };
