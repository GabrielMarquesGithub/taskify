import { Body, Controller, Get, Inject, Post, UsePipes } from "@nestjs/common";

import { ITaskRepository } from "@domain/repositories/ITaskRepository";

import { CreateTask } from "@application/use-cases/CreateTask";
import { GetTasks } from "@application/use-cases/GetTasks";

import { ZodValidationPipe } from "@presentation/validators/ZodValidationPipe";
import {
  createTaskSchema,
  ICreateTaskSchema
} from "@presentation/validators/schemas/task";

@Controller("task")
export class TaskController {
  constructor(
    @Inject("ITaskRepository") private readonly taskRepository: ITaskRepository
  ) {}

  @Get()
  getTasks() {
    return new GetTasks(this.taskRepository).execute();
  }

  @Post("add")
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  createTask(@Body() body: ICreateTaskSchema) {
    return new CreateTask(this.taskRepository).execute(body);
  }
}
