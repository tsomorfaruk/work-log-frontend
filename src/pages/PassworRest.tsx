import Input from "@/components/common/Input";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "@/hooks/useApi";
import { AuthEndpoint } from "@/apis/Auth";
import { Utils } from "@/lib/utils";
import { toast } from "sonner";

export default function PasswordReset() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { apiRequest } = useApi({
    endpoint: AuthEndpoint.resetPassword,
    method: "post",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Utils.getFormData(e.currentTarget);

    if (data.password !== data.password_confirmation) {
      setError("Password not match");
      return;
    }

    const response = await apiRequest({ payload: data });

    if (!response.hasError) {
      toast.success("Your pass rest successfully");
      navigate("/login");
      return;
    }

    const axiosMsg =
      (response.hasError as Record<string, object>)?.response?.data?.message ??
      "Action Failed";

    setError(axiosMsg);

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  };
  return (
    <div>
      <h2 className="text-4xl font-bold text-303030 mb-6 text-start">
        Reset Your Password
      </h2>
      {error && (
        <div className="absolute top-[86px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-base ">
          {error || "Something went wrong!"}
        </div>
      )}
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6 ">
        <div>
          <label className="block text-sm  text-303030 mb-3">
            Enter email or username
          </label>
          <Input
            name="email"
            height={62}
            type="email"
            className="input-class"
            placeholder="Enter email or password"
            required
          />
        </div>
        <div>
          <label className="block text-sm  text-303030 mb-3">Enter Token</label>
          <Input
            name="token"
            height={62}
            type="text"
            className="input-class"
            placeholder="Enter your token sent to email"
            required
          />
        </div>
        <div>
          <label className="block text-sm  text-303030 mb-3">Password</label>
          <Input
            name="password"
            height={62}
            type="text"
            className="input-class"
            placeholder="Enter Password"
            required
          />
        </div>
        <div>
          <label className="block text-sm  text-303030 mb-3">
            Confirm Password
          </label>
          <Input
            name="password_confirmation"
            height={62}
            type="text"
            className="input-class"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="flex items-center">
          <span className="mr-2 text-xs text-686868">Remembered password?</span>
          <Link to="/login" className="text-xs text-686868">
            Login
          </Link>
        </div>

        <button
          type="submit"
          className="mt-[42px] w-full h-[60px] bg-007B99 text-white font-medium rounded-lg transition-colors"
        >
          Rest Password
        </button>
      </form>
    </div>
  );
}
