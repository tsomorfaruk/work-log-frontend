import { z } from "zod";

export const alterScheduleSchema = (leave_type: string | null = null) =>
  z.object({
    // employee_id: z.string().min(1, "Employee / Shift Type is required"),
    employee_id: z
      .array(z.number().nonnegative())
      .optional()
      .refine((val) => Array.isArray(val) && val.length > 0, {
        message: "Employee is required",
      }),
    date: z
      .string({ message: "Date is required" })
      .trim()
      .min(1, "Date is required"),
    start_time: leave_type
      ? z.string().optional()
      : z
          .string({ message: "Start Time is required" })
          .trim()
          .min(1, "Start Time is required"),
    end_time: leave_type
      ? z.string().optional()
      : z
          .string({ message: "End Time is required" })
          .trim()
          .min(1, "End Time is required"),
    note: z.string().optional(),
    leave_type: z.string().optional(),
  });

export type TAlterScheduleSchema = z.infer<
  ReturnType<typeof alterScheduleSchema>
>;

export const AlterScheduleSchema = alterScheduleSchema();

export const scheduleDefaultValues: Partial<TAlterScheduleSchema> = {
  // employee_id: "",
  note: "",
};
