import { Task } from "@domain/entities/Task";

export function toResponseTask(task: Task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    state: task.state,
    isCompleted: task.isCompleted,
    taskGroup: task.taskGroup,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
}

export function toResponseTasks(tasks: Task[]) {
  return tasks.map(toResponseTask);
}
