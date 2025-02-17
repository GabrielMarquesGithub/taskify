import { Controller, Get } from "@nestjs/common";

@Controller("task")
export class TaskController {
  constructor() {}

  @Get()
  check() {
    return {
      status: "ok",
      message: "Hello, World!",
    };
  }
}
