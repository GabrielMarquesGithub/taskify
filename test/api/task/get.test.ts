import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";

import { Orchestrator } from "../../Orchestrator";
import { tasksSeed } from "../../seeds/tasksSeed";

const orchestrator = Orchestrator.instance;

beforeAll(async () => {
  await orchestrator.cleanDatabase();
  await orchestrator.seedTaskEntity(tasksSeed);
  await orchestrator.init();
});

afterAll(async () => {
  await orchestrator.close();
});

describe("GET /task", () => {
  it(`Getting tasks`, async () => {
    const response = await orchestrator.app.inject({
      method: "GET",
      url: "/task"
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(tasksSeed);
  });
});
