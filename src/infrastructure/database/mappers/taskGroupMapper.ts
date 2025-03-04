import { TaskGroup as PrismaTaskGroup } from "@prisma/client";

import { TaskGroup } from "@domain/entities/TaskGroup";
import { Task } from "@domain/entities/Task";

type IDBTaskGroup = PrismaTaskGroup & { tasks?: Task[] };

export function toDomainTaskGroup(taskGroup: IDBTaskGroup): TaskGroup {
  return new TaskGroup({ ...taskGroup });
}
