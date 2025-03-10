import { Task } from "@domain/entities/Task";

export function toResponse(task: Task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    state: task.state,
    isCompleted: task.isCompleted,
    taskGroup: task.taskGroup
  };
}
