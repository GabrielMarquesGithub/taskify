import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";

import { AppModule } from "@infrastructure/server/modules/app.module";

class Orchestrator {
  private _app: NestFastifyApplication;
  private static _instance: Orchestrator;
  public readonly idRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    const app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    this._app = app;
  }

  public async close() {
    await this._app.close();
  }
}

export { Orchestrator };
