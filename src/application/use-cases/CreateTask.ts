import { Task } from "@domain/entities/Task";
import { ITaskRepository } from "@domain/repositories/ITaskRepository";

import { toResponseTask } from "@application/mappers/taskMapper";
import { ICreateTaskDTO } from "@application/dtos/ICreateTaskDTO";

class CreateTask {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(createTaskDTO: ICreateTaskDTO) {
    const newTask = new Task(createTaskDTO);
    const savedTask = await this.taskRepository.saveTask(newTask);
    return toResponseTask(savedTask);
  }
}

export { CreateTask };
