import { Module } from "@nestjs/common";

import { TaskRepository } from "@infrastructure/database/repositories/TaskRepository";
import { PrismaService } from "@infrastructure/server/services/prisma.service";

import { TaskController } from "@presentation/rest/controllers/task.controller";

@Module({
  controllers: [TaskController],
  providers: [
    PrismaService,
    {
      provide: "ITaskRepository",
      useClass: TaskRepository
    }
  ]
})
export class TasksModule {
  addTask(): void {
    console.log("add task");
  }
}
