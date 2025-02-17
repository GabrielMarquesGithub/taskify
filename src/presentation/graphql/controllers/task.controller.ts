import { Controller, Get } from "@nestjs/common";

const test: (test: string) => void = test => console.log(test);
test("Hello, World!");

@Controller("task")
export class TaskController {
  constructor() { }

  @Get()
  check() {
    return {
      status: "ok",
      message: "Hello, World!",
    };
  }
}
