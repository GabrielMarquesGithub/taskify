import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UsePipes
} from "@nestjs/common";

import { ITaskRepository } from "@domain/repositories/ITaskRepository";

import { CreateTask } from "@application/use-cases/CreateTask";
import { GetTasks } from "@application/use-cases/GetTasks";

import { ZodValidationPipe } from "@presentation/validators/ZodValidationPipe";
import {
  createTaskSchema,
  ICreateTaskSchema,
  ITaskOrderFieldsSchema,
  taskOrderFieldsSchema
} from "@presentation/validators/schemas/task";
import {
  getBaseListFiltersSchema,
  IBaseListFiltersSchema
} from "@presentation/validators/schemas/shared";

@Controller("task")
export class TaskController {
  constructor(
    @Inject("ITaskRepository") private readonly taskRepository: ITaskRepository
  ) {}

  @Get()
  @UsePipes(
    new ZodValidationPipe(getBaseListFiltersSchema(taskOrderFieldsSchema))
  )
  getTasks(@Query() query: IBaseListFiltersSchema<ITaskOrderFieldsSchema>) {
    return new GetTasks(this.taskRepository).execute(query);
  }

  @Post("add")
  @UsePipes(new ZodValidationPipe(createTaskSchema))
  createTask(@Body() body: ICreateTaskSchema) {
    return new CreateTask(this.taskRepository).execute(body);
  }
}
