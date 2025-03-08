import { Task as PrismaTask } from "@prisma/client";

import { Task } from "@domain/entities/Task";
import { TaskGroup } from "@domain/entities/TaskGroup";

type IDBTask = PrismaTask & { taskGroup?: TaskGroup };

type ISaveTaskDTO = Pick<
  PrismaTask,
  "id" | "description" | "title" | "taskGroupId"
>;

export function toDomainTask(task: IDBTask): Task {
  return new Task({ ...task, description: task.description ?? undefined });
}

export function toDomainTasks(tasks: IDBTask[]): Task[] {
  return tasks.map((task) => toDomainTask(task));
}

export function toPersistenceTask(task: Task): ISaveTaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description ?? null,
    taskGroupId: task.taskGroup?.id ?? null
  };
}

export function toPersistenceTasks(tasks: Task[]): ISaveTaskDTO[] {
  return tasks.map((task) => toPersistenceTask(task));
}
