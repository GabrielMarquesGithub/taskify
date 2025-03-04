import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TasksModule } from "@infrastructure/server/modules/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.development",
      expandVariables: true
    }),
    TasksModule
  ]
})
export class AppModule {
  addTask(): void {
    console.log("add task");
  }
}
