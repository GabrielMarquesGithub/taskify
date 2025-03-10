import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";
import { PrismaClient } from "@prisma/client";

import { Task } from "@domain/entities/Task";

import { AppModule } from "@infrastructure/server/modules/app.module";
import { toPersistenceTasks } from "@infrastructure/database/mappers/taskMapper";

class Orchestrator {
  private _app: NestFastifyApplication;
  private prisma = new PrismaClient();
  private static _instance: Orchestrator;

  private constructor() {
    void Test.createTestingModule({
      imports: [AppModule]
    })
      .compile()
      .then((testModule) => {
        this._app = testModule.createNestApplication<NestFastifyApplication>(
          new FastifyAdapter()
        );
      });
  }

  public static get instance(): Orchestrator {
    // Eslint não reconhece o padrão Singleton
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this._instance) {
      this._instance = new Orchestrator();
    }

    return this._instance;
  }

  public get app(): NestFastifyApplication {
    return this._app;
  }

  public async init() {
    await this._app.init();
    await this._app.getHttpAdapter().getInstance().ready();
  }

  public async close() {
    await this._app.close();
  }

  public async cleanDatabase() {
    const tablenames = await this.prisma.$queryRaw<
      { tablename: string }[]
    >`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;

    // Filtra as tabelas que não são de migração e as formata para o comando TRUNCATE
    const tables = tablenames
      .map(({ tablename }) => tablename)
      .filter((name) => name !== "_prisma_migrations")
      .map((name) => `"public"."${name}"`)
      .join(", ");

    await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  }

  public async seedTaskEntity(tasksSeed: Task[]) {
    await this.prisma.task.createMany({
      data: toPersistenceTasks(tasksSeed)
    });
  }
}

export { Orchestrator };
