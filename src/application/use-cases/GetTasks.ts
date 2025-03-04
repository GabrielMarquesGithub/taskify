import { Task } from "@domain/entities/Task";

import { ITaskRepository } from "@domain/repositories/ITaskRepository";

class GetTasks {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getTasks();
  }
}

export { GetTasks };
