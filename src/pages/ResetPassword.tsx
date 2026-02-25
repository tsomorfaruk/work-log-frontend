import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Input from "@/components/common/Input";
import Button from "@/components/ui/button";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import {
  resetPasswordDefaultValues,
  ResetPasswordSchema,
  TResetPasswordSchema,
} from "@/schemas/resetPasswordSchema";
import { useResetPasswordMutation } from "@/services/auth/authService";

export default function PasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const methods = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) methods.setValue("token", token);
  }, [searchParams, methods]);

  const onSubmit = (data: TResetPasswordSchema) => {
    resetPassword(data)
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Reset password error:", err);
        const errorMessage = err?.data?.message || "Failed to reset password. Please check your token.";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="p-6">
      <FormProvider {...methods}>
        <h2 className="text-4xl font-bold text-[#303030] mb-8 text-start">
          Reset Your Password
        </h2>
        
        <form className="space-y-4">
          <HookFormItem name="email" label="Email" isRequired>
            <Input height={62} placeholder="Confirm your email" />
          </HookFormItem>

          <HookFormItem name="password" label="New Password" isRequired>
            <Input height={62} type="password" placeholder="Enter new password" />
          </HookFormItem>

          <HookFormItem name="password_confirmation" label="Confirm New Password" isRequired>
            <Input height={62} type="password" placeholder="Confirm new password" />
          </HookFormItem>

          <div className="pt-4">
            <Button
              onClick={() => {
                methods.handleSubmit(onSubmit)();
              }}
              isLoading={isLoading}
              variant="primary"
              className="w-full"
            >
              Reset Password
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="default"
              onClick={() => navigate("/login")}
              className="text-sm"
            >
              Back to Login
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
