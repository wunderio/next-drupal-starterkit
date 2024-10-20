import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});

export type RegisterFormInputs = z.infer<typeof registerFormSchema>;
