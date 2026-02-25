import { FormProvider, useForm } from "react-hook-form";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import {
  forgotPasswordDefaultValues,
  ForgotPasswordSchema,
  TForgotPasswordSchema,
} from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/Input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/services/auth/authService";

export default function ForgotPassword() {
  const methods = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onSubmit = (data: TForgotPasswordSchema) => {
    forgotPassword(data)
      .unwrap()
      .then(() => {
        toast.success("A password reset link has been sent to your email. Please check your inbox.");
      })
      .catch((err) => {
        console.error("err: ", err);
        const errorMessage = err?.data?.message || "Failed to send reset link";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="p-4">
      <FormProvider {...methods}>
        <h2 className="text-4xl font-bold text-[#303030] mb-6 text-start pt-8">
          Forgot Password
        </h2>
        <div className="space-y-4 mb-4 w-full">
          <HookFormItem name="email" label="Email" isRequired>
            <Input height={62} placeholder="Enter your email" />
          </HookFormItem>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmit)();
          }}
          isLoading={isLoading}
          variant="primary"
        >
          Submit
        </Button>
        <div className="flex items-center mt-6">
          <span className="mr-2 text-xs text-[#686868]">
            Remembered Password?
          </span>
          <Link to="/login" className="text-xs text-[#BA1A1A] font-semibold hover:underline">
            Login
          </Link>
        </div>
      </FormProvider>
    </div>
  );
}
