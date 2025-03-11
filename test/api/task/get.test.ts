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

function testTaskFormat(task: Task) {
  expect(task).toHaveProperty("id");
  expect(task.id).toMatch(orchestrator.idRegex);
  expect(task).toHaveProperty("title");
  expect(typeof task.title).toBe("string");
  expect(task).toHaveProperty("state");
  expect(typeof task.state).toBe("string");
  expect(task).toHaveProperty("isCompleted");
  expect(typeof task.isCompleted).toBe("boolean");
  expect(task).toHaveProperty("createdAt");
  expect(typeof task.createdAt).toBe("string");
  expect(task).toHaveProperty("updatedAt");
  expect(typeof task.updatedAt).toBe("string");
}

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

    responseBody.forEach(testTaskFormat);
  });

  it(`Getting tasks with search`, async () => {
    const title = tasksSeed[0].title;

    const response = await orchestrator.app.inject({
      method: "GET",
      url: `/task?search=${title}`
    });

    expect(response.statusCode).toBe(200);
    const responseBody: Task[] = response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBe(1);

    const task = responseBody[0];

    testTaskFormat(task);
    expect(task.title).toBe(title);
  });

  it(`Getting tasks with limit`, async () => {
    const limit = 2;

    const response = await orchestrator.app.inject({
      method: "GET",
      url: `/task?limit=${limit.toString()}`
    });

    expect(response.statusCode).toBe(200);
    const responseBody: Task[] = response.json();
    expect(responseBody).toBeInstanceOf(Array);
    expect(responseBody.length).toBe(limit);
  });
});
