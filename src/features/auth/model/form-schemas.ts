import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email({ error: 'Некорректный email' }),
  password: z
    .string({ error: 'Введите пароль' })
    .min(8, { error: 'Пароль должен быть не менее 8 символов' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
