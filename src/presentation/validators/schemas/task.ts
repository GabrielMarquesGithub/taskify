import { z } from "zod";

export type ICreateTaskSchema = z.output<typeof createTaskSchema>;

export type ITaskOrderFieldsSchema = z.output<typeof taskOrderFieldsSchema>;

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: "O titulo é obrigatório",
      invalid_type_error: "O titulo deve ser uma string"
    })
    .min(3, "O titulo deve ter no mínimo 3 caracteres")
    .max(200, "O titulo deve ter no máximo 200 caracteres"),
  description: z
    .string({
      invalid_type_error: "A descrição deve ser uma string"
    })
    .min(3, "A descrição deve ter no mínimo 3 caracteres")
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional()
});

export const taskOrderFieldsSchema = z.enum(["title", "description", "state"], {
  message:
    "O campo de ordenação deve ser um dos campos: title, description, state"
});
