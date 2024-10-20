import { z } from "zod";

export const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginFormInputs = z.infer<typeof loginFormSchema>;
