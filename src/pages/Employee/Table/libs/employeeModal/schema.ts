import { z } from "zod";

export const alterEmployeeSchema = (isEdit = false) =>
  z.object({
    first_name: z.string().trim().min(1, "First name is required"),
    last_name: z.string().optional(),
    display_name: z.string().trim().min(1, "Display name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z.string().trim().min(1, "Phone is required"),
    designation: z.string().trim().min(1, "Designation is required"),
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

    is_active: z
      .array(z.number().nonnegative())
      .optional()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "At least one Status is required",
      }),

    password: isEdit
      ? z.string().optional()
      : z.string().trim().min(1, "Password is required"),

    password_confirmation: isEdit
      ? z.string().optional()
      : z.string().trim().min(1, "Password confirmation is required"),

    image: z.file().optional(),
    address: z.string().trim().optional(),
  });

export type TAlterEmployeeSchema = z.infer<
  ReturnType<typeof alterEmployeeSchema>
>;

export const AlterEmployeeSchema = alterEmployeeSchema();

// export const employeeDefaultValues: Partial<TAlterEmployeeSchema> = {
//   first_name: "first_name",
//   last_name: "Last_name",
//   display_name: "Display_name",
//   department_id: [],
//   role: [],

//   phone: "1",
//   email: "some@gmail.com",

//   designation: "1",
//   is_active: [1],
//   password: "pass11",
//   password_confirmation: "pass11",
//   image: undefined,
//   address: "Address",
// };
export const employeeDefaultValues: Partial<TAlterEmployeeSchema> = {
  first_name: "",
  last_name: "",
  display_name: "",
  department_id: [],
  role: [],

  phone: "",
  email: "",

  designation: "",
  is_active: [1],
  password: "",
  password_confirmation: "",
  image: undefined,
  address: "",
};
