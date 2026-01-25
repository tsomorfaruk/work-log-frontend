import { useLayoutEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import BgUrl from "@/assets/images/loginBg.jpg";

import { getAuthToken } from "@/lib/authCookie";

export default function UnAuthorizedRoutes() {
  const navigate = useNavigate();

  const [tokenState, setTokenState] = useState<string | null | undefined>(
    undefined,
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
      {/* <div className="w-10/12 lg:w-4/12 mx-auto bg-[#CFE6F1] h-screen ">
        <Outlet />
      </div> */}
      <div className="w-10/12 lg:w-4/12 mx-auto bg-[#CFE6F1] rounded-3xl">
        {/* <div className=""> */}
        <Outlet />
      </div>
    </div>
  );
}
