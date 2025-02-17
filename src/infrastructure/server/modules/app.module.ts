import { Module } from "@nestjs/common";

import { TasksModule } from "@infrastructure/server/modules/task.module";

@Module({
  imports: [TasksModule],
})
export class AppModule {}
