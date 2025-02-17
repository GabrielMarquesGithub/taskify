import { Module } from "@nestjs/common";
import { TaskController } from "@presentation/graphql/controllers/task.controller";

@Module({
  controllers: [TaskController],
})
export class TasksModule {}
