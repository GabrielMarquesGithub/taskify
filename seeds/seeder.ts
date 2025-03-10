import { PrismaClient } from "@prisma/client";

import { tasksSeed } from "./tasksSeed";
import { TaskRepository } from "@infrastructure/database/repositories/TaskRepository";

const prisma = new PrismaClient();

const taskRepository = new TaskRepository(prisma);

async function main() {
  await taskRepository.saveTasks(tasksSeed);
}

const handleError = (error: unknown) => {
  console.error(error);
  process.exit(1);
};

main()
  .catch(handleError)
  .finally(() => {
    prisma.$disconnect().catch(handleError);
  });
