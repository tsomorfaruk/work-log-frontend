// import Input from "@/components/common/Input";
// import { useState } from "react";
// import {  useNavigate } from "react-router-dom";
// import { useApi } from "@/hooks/useApi";
// import { AuthEndpoint } from "@/apis/Auth";
// import { Utils } from "@/lib/utils";

// import { toast } from "sonner";

export default function OTPForm() {
  // const navigate = useNavigate();

  // const [error, setError] = useState<string | null>(null);
  // const { apiRequest } = useApi({
  //   endpoint: AuthEndpoint.forgotPassword,
  //   method: "post",
  // });
  // console.log('error: ', error);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const data = Utils.getFormData(e.currentTarget);

  //   const response = await apiRequest({ payload: data });

  //   if (!response.hasError) {
  //     toast.success(`OTP sent to ${data.email}`);
  //     navigate("/otp-form");
  //     return;
  //   }

  //   /** -------------------------
  //    *  Handle Error with TS-safe typing
  //    * ------------------------ */
  //   const axiosMsg =
  //     // (response.hasError as Record<string, object>)?.response?.data?.message ??
  //     (response.hasError as any)?.response?.data?.message ?? "Login failed";

  //   setError(axiosMsg);

  //   const timer = setTimeout(() => {
  //     setError(null);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // };
  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email ba**@dipainhouse.com</p>
        </div>
      </div>

      <div>
        <form action="" method="post">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="w-16 h-16 ">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  className="flex flex-row items-center text-blue-600"
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
