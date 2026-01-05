import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import TextComp from "@/assets/svgs/Text.svg?react";
import BgUrl from "@/assets/images/loginBg.jpg";

import { getAuthToken } from "@/lib/authCookie";

export default function UnAuthorizedRoutes() {
  const navigate = useNavigate();

  const [tokenState, setTokenState] = useState<string | null | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    const token = getAuthToken();
    setTokenState(token);

    if (token) {
      navigate("/scheduling"); // redirecting but not rendering anything
    }
  }, [navigate]);

  // 1️⃣ still checking
  if (tokenState === undefined) return null;

  // 2️⃣ token exists → don’t render anything (navigation will happen)
  if (tokenState) return null;

  // 3️⃣ token is null → render login UI
  return (
    <div
      style={{ backgroundImage: `url(${BgUrl})` }}
      className="min-h-screen bg bg-cover bg-center bg-no-repeat place-content-center"
    >
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 md:col-span-6">
          <div className="h-full flex items-center justify-center">
            <TextComp />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex justify-center items-center">
          <div className="max-w-[457px] max-h-[90vh] overflow-auto relative w-full h-full bg-F2FCFF rounded-3xl shadow-lg p-[36px_44px_68px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
