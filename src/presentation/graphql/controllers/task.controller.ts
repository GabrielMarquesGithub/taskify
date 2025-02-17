import { Controller, Get } from "@nestjs/common";

@Controller("task")
export class TaskController {
  @Get()
  check() {
    return {
      status: "ok",
      message: "Hello, World!"
    };
  }
}
