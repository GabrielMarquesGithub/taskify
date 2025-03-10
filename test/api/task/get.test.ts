import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";

import { Task } from "@domain/entities/Task";

import { Orchestrator } from "../../Orchestrator";
import { tasksSeed } from "../../../seeds/tasksSeed";

const orchestrator = Orchestrator.instance;

beforeAll(async () => {
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
    const responseBody: Task[] = response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBeGreaterThanOrEqual(tasksSeed.length);

    responseBody.forEach((task) => {
      expect(task).toHaveProperty("id");
      expect(task.id).toMatch(orchestrator.idRegex);
      expect(task).toHaveProperty("title");
    });
  });
});
