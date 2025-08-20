import { Task } from "@domain/entities/Task";

const tasksSeed: Task[] = [
  new Task({
    title: "Task 1",
    description: "Description of task 1"
  }),
  new Task({
    title: "Task 2",
    description: "Description of task 2"
  }),
  new Task({
    title: "Task 3",
    description: "Description of task 3"
  })
];

export { tasksSeed };
