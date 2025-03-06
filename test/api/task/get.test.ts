import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";
import { Test } from "@nestjs/testing";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";

import { AppModule } from "@infrastructure/server/modules/app.module";

let app: NestFastifyApplication;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  app = moduleRef.createNestApplication<NestFastifyApplication>(
    new FastifyAdapter()
  );
  await app.init();
  await app.getHttpAdapter().getInstance().ready();
});

afterAll(async () => {
  await app.close();
});

describe("GET /task", () => {
  it(`Getting tasks`, async () => {
    const response = await app.inject({
      method: "GET",
      url: "/task"
    });
    expect(response.statusCode).toBe(200);
    console.log(response.payload);
  });
});
