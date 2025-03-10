import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";

import { Orchestrator } from "../../Orchestrator";

const orchestrator = Orchestrator.instance;

beforeAll(async () => {
  await orchestrator.init();
});

afterAll(async () => {
  await orchestrator.close();
});

describe("POST /task", () => {
  it(`Crating task`, async () => {
    const newTask = {
      title: "teste",
      description: "teste"
    };

    const response = await orchestrator.app.inject({
      method: "POST",
      url: "/task/add",
      payload: newTask
    });

    expect(response.statusCode).toBe(201);
  });
});
