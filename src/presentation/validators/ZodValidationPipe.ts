import {
  PipeTransform,
  // ArgumentMetadata,
  BadRequestException
} from "@nestjs/common";
import { ZodSchema, ZodError } from "zod";

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  // transform(value: unknown, metadata: ArgumentMetadata)
  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        throw new BadRequestException(error.errors[0].message);
      }

      throw new BadRequestException("Falha na validação");
    }
  }
}
