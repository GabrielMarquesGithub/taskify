import { Module } from "@nestjs/common";

import { TaskRepository } from "@infrastructure/database/repositories/TaskRepository";
import { PrismaService } from "@infrastructure/server/services/prisma.service";

import { TaskController } from "@presentation/rest/controllers/task.controller";

@Module({
  controllers: [TaskController],
  providers: [
    {
      provide: "ITaskRepository",
      useFactory: () => new TaskRepository(new PrismaService())
    }
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TasksModule {}
