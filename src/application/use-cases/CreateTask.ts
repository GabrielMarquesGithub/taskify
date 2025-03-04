import { Task } from "@domain/entities/Task";

import { ICreateTaskDTO } from "@application/dtos/ICreateTaskDTO";

import { ITaskRepository } from "@domain/repositories/ITaskRepository";

class CreateTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(createTaskDTO: ICreateTaskDTO): Promise<Task> {
    const newTask = new Task(createTaskDTO);
    return await this.taskRepository.saveTask(newTask);
  }
}

export { CreateTask };
