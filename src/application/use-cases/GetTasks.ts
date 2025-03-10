import { Task } from "@domain/entities/Task";
import {
  ITaskListFilters,
  ITaskRepository
} from "@domain/repositories/ITaskRepository";

class GetTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(filters: ITaskListFilters): Promise<Task[]> {
    return await this.taskRepository.getTasks(filters);
  }
}

export { GetTasks };
