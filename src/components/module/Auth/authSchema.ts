import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[A-Z])/, {
      error: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      error: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      error: "Password must contain at least 1 number.",
    }),
});

export const registerSchema = z
  .object({
    name: z
      .string("Name is must be a string")
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters long"),
    email: z.email(),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[A-Z])/, {
        error: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Password must contain at least 1 number.",
      }),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[A-Z])/, {
        error: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Password must contain at least 1 number.",
      }),
    address: z.string(),
    role: z.enum(["ADMIN", "SENDER", "RECEIVER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
