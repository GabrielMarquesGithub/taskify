import { z } from "zod";

export type IBaseListFiltersSchema<T extends string> = z.output<
  ReturnType<typeof getBaseListFiltersSchema<[T]>>
>;

export function getBaseListFiltersSchema<T extends [string, ...string[]]>(
  orderByEnum: z.ZodEnum<T>
) {
  return z.object({
    limit: z
      .number({
        coerce: true,
        invalid_type_error: "O limite deve ser um número"
      })
      .int("O limite deve ser um número inteiro")
      .positive("O limite deve ser um número positivo")
      .optional(),
    offset: z
      .number({
        coerce: true,
        invalid_type_error: "O offset deve ser um número"
      })
      .int("O offset deve ser um número inteiro")
      .positive("O offset deve ser um número positivo")
      .optional(),
    orderBy: orderByEnum.optional(),
    order: z
      .enum(["asc", "desc"], {
        message: "O campo de ordenação deve ser `asc` ou `desc`"
      })
      .optional(),
    search: z
      .string({
        coerce: true,
        invalid_type_error: "A busca deve ser uma string"
      })
      .max(255, "A busca deve ter no máximo 100 caracteres")
      .min(3, "A busca deve ter no mínimo 3 caracteres")
      .optional()
  });
}
