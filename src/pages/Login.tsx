import Input from "@/components/common/Input";
import { FormEvent, ReactNode, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TextComp from "@/assets/svgs/Text.svg?react";
import { useApi } from "@/hooks/useApi";
import { AuthEndpoint } from "@/apis/Auth";
import { Utils } from "@/lib/utils";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { CookieManager } from "@/classes/CookieManger";
import { capitalize, set } from "lodash";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const { apiRequest } = useApi(
    { endpoint: AuthEndpoint.login, method: "post" },
    false
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Utils.getFormData(e.currentTarget);

    const response = await apiRequest({ payload: data });

    if (!response.hasError) {
      const { token, user } = response.result?.data || {};

      setAuth({ token: token ?? null, user: user ?? null });

      // Remember me
      if (data?.isRemember?.checked) {
        CookieManager.set("token", token, { days: 7 });
      }

      navigate("/");
      return;
    }

    /** -------------------------
     *  Handle Error with TS-safe typing
     * ------------------------ */
    const axiosMsg =
      (response.hasError as any)?.response?.data?.message ?? "Login failed";

    setError(axiosMsg);

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  };
  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-6">
        <div className="h-full flex items-center justify-center">
          <TextComp />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 flex justify-center items-center">
        <div className="max-w-[457px] relative w-full h-full bg-F2FCFF rounded-3xl shadow-lg p-[36px_44px_68px]">
          <h2 className="text-4xl font-bold text-303030 mb-6 text-start">
            Sign In
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
              <label className="block text-sm  text-303030 mb-3">
                Password
              </label>
              <Input
                name="password"
                height={62}
                type="text"
                className="input-class"
                placeholder="Enter Password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Input
                  name="isRemember"
                  type="checkbox"
                  className="rounded text-xs"
                />
                <span className="ml-2 text-xs text-686868">Remember me</span>
              </label>
              <Link to="password" className="text-xs text-686868">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="mt-[42px] w-full h-[60px] bg-007B99 text-white font-medium rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
