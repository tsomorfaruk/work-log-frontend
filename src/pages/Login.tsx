import { useLoginMutation } from "@/services/auth/authService";
import { FormProvider, useForm } from "react-hook-form";
import HookFormItem from "@/components/shared/hookform/HookFormItem";
import {
  loginDefaultValues,
  LoginSchema,
  TLoginSchema,
} from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/Input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { userLoggedIn } from "@/services/auth/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const methods = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: loginDefaultValues,
    // defaultValues: {
    //   key1: "hmm",
    // },
    // mode:'onChange'
  });

  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

  const onSubmit = (data: TLoginSchema) => {
    console.log("data: ", data);
    loginUser(data)
      .unwrap()
      .then((res) => {
        console.log("res: ", res);

        const token = res?.data?.token;
        toast.success("Login successful");
        navigate("/scheduling");
        dispatch(userLoggedIn(token));
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error("Login failed");
      });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div className="space-y-2 mb-4">
          <HookFormItem name="email" label="Email" isRequired>
            <Input className="input-class" />
          </HookFormItem>

          <HookFormItem name="password" label="Password" isRequired>
            <Input className="input-class" />
          </HookFormItem>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmit)();
          }}
        >
          Save
        </Button>
      </FormProvider>
    </div>
  );

  // return (
  //   <div>
  //     <h2 className="text-4xl font-bold text-303030 mb-6 text-start">
  //       Sign In
  //     </h2>
  //     <button onClick={obgg}>test</button>
  //     {error && (
  //       <div className="absolute top-[86px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-base ">
  //         {error || "Something went wrong!"}
  //       </div>
  //     )}
  //     <form onSubmit={(e) => handleSubmit(e)} className="space-y-6 ">
  //       <div>
  //         <label className="block text-sm  text-303030 mb-3">
  //           Enter email or username
  //         </label>
  //         <Input
  //           name="email"
  //           height={62}
  //           type="email"
  //           className="input-class"
  //           placeholder="Enter email or username"
  //           required
  //         />
  //       </div>
  //       <div>
  //         <label className="block text-sm  text-303030 mb-3">Password</label>
  //         <Input
  //           name="password"
  //           height={62}
  //           type="text"
  //           className="input-class"
  //           placeholder="Enter Password"
  //           required
  //         />
  //       </div>

  //       <div className="flex items-center justify-between">
  //         <label className="flex items-center">
  //           <Input
  //             name="isRemember"
  //             type="checkbox"
  //             className="rounded text-xs"
  //           />
  //           <span className="ml-2 text-xs text-686868">Remember me</span>
  //         </label>
  //         <Link to="/forgot-password" className="text-xs text-686868">
  //           Forgot password?
  //         </Link>
  //       </div>

  //       <button
  //         type="submit"
  //         className="mt-[42px] w-full h-[60px] bg-007B99 text-white font-medium rounded-lg transition-colors"
  //       >
  //         Sign In
  //       </button>
  //     </form>
  //   </div>
  // );
}
