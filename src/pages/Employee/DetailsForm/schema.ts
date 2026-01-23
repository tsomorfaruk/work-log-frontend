import { z } from "zod";

export const alterEmployeeSchema = () =>
  z.object({
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().optional(),
    phone: z.string().trim().min(1, "Phone is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    dob: z.string().optional(),
    address: z.string().trim().optional(),
    blood_group: z.array(z.string()).optional(),
    // section - 2

    department_id: z
      .array(z.number().nonnegative())
      .optional()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "Department is required",
      }),

    role: z
      .array(z.string())
      .optional()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "At least one role is required",
      }),
    day_of_joining: z.string().optional(),
    job_type: z.string().optional(),

    // section - 3

    bank_acc_name: z.string().optional(),
    bank_acc_number: z.string().optional(),
    bank_routing_number: z.string().optional(),
    bank_address: z.string().optional(),
  });

export type TAlterEmployeeSchema = z.infer<
  ReturnType<typeof alterEmployeeSchema>
>;

export const AlterEmployeeSchema = alterEmployeeSchema();

export const employeeDefaultValues: Partial<TAlterEmployeeSchema> = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  address: "",

  department_id: [],
  role: [],
};
