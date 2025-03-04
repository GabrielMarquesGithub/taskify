import { Task } from "@domain/entities/Task";

type ITaskRepository = {
  saveTask(task: Task): Promise<Task>;
  getTaskById(id: string): Promise<Task | undefined>;
  getTasks(): Promise<Task[]>;
};

export { ITaskRepository };
