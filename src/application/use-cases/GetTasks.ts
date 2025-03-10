import {
  ITaskListFilters,
  ITaskRepository
} from "@domain/repositories/ITaskRepository";

import { toResponseTasks } from "@application/mappers/taskMapper";

class GetTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(filters: ITaskListFilters) {
    const tasks = await this.taskRepository.getTasks(filters);
    return toResponseTasks(tasks);
  }
}

export { GetTasks };
