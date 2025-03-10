import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { z } from "zod";

import { TasksModule } from "@infrastructure/server/modules/task.module";

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_PORT: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_URL: z.string()
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env.development",
      expandVariables: true,
      validate: (env): typeof process.env => {
        return envSchema.parse(env);
      }
    }),
    TasksModule
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
