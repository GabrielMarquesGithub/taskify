import { Task } from "@domain/entities/Task";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";

import { IBaseListFilters } from "@domain/interfaces/IBaseListFilters";

class GetTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(filters: IBaseListFilters): Promise<Task[]> {
    return await this.taskRepository.getTasks(filters);
  }
}

export { GetTasks };
