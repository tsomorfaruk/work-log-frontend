import Input from "@/components/common/Input";
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import TextComp from "@/assets/svgs/Text.svg?react";

export default function Login() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12 md:col-span-6">
        <div className="h-full flex items-center justify-center">
          <TextComp />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 flex justify-center items-center">
        <div className="max-w-[457px] w-full h-full bg-F2FCFF rounded-3xl shadow-lg p-[36px_44px_68px]">
          <h2 className="text-4xl font-bold text-303030 mb-6 text-start">
            Sign In
          </h2>

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div>
              <label className="block text-sm  text-303030 mb-3">
                Enter email or username
              </label>
              <Input
                height={62}
                type="text"
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
                height={62}
                type="text"
                className="input-class"
                placeholder="Enter Password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Input type="checkbox" className="rounded text-xs" />
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
