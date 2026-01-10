import InputGroup from "@/components/common/InputGroup";
import Loader from "@/components/common/Loader";
import RenderTo from "@/components/common/RenderTo";
import { BellIcon, CalendarIcon, SearchIcon, UserIcon } from "@/icons";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/services/auth/authService";
import { userLoggedOut } from "@/services/auth/authSlice";
import {} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    logout()
      .unwrap()
      .then(() => {
        // Not coming here. Having trouble (401). goes to error. Must check what's wrong with token set
        navigate("/login");
        dispatch(userLoggedOut());
      })
      .catch((err) => {
        console.error("err: ", err);
        toast.error("Login failed");
      });
  };

  return (
    <nav className="flex items-center py-2 mt-2 shadow-md bg-F2FCFF fixed top-0 w-full mx-4 z-50">
      <RenderTo
        top={"50%"}
        left={"50%"}
        transform="translate(-50%,-50%)"
        isOpen={isLoading}
      >
        <Loader />
      </RenderTo>
      <div className="container mx-auto flex items-center gap-6">
        <div className="flex-1">
          <img
            src="https://www.svgrepo.com/show/491978/gas-costs.svg"
            height="40"
            width="40"
          />
        </div>

        <InputGroup type="search" startIcon={<SearchIcon height={16} />} />
        <div className="flex items-center gap-6">
          <BellIcon
            width={50}
            height={50}
            className="p-2.5  bg-CFE6F1 rounded-full"
          />
          <CalendarIcon
            width={50}
            height={50}
            className="p-2.5  bg-CFE6F1 rounded-full"
          />
        </div>
        <UserIcon width={50} height={50} />

        <button onClick={handleLogout}>Logout</button>

        {/* <LogOut className="cursor-pointer" onClick={handleLogout} size={32} /> */}
      </div>
    </nav>
  );
}
