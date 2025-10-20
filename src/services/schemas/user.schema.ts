import z from "zod";

export const UserCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
  })

export type UserCreateSchemaType = z.infer<typeof UserCreateSchema>;