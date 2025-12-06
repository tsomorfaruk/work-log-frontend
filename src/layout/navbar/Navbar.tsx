import { AuthEndpoint } from "@/apis/Auth";
import { CookieManager } from "@/classes/CookieManger";
import Loader from "@/components/common/Loader";
import RenderTo from "@/components/common/RenderTo";
import { useApi } from "@/hooks/useApi";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();
  const { apiRequest, isLoading } = useApi({
    endpoint: AuthEndpoint.logout,
    method: "post",
  });

  const handleLogout = async () => {
    const response = await apiRequest({});
    if (!response.hasError) {
      CookieManager.clear("token");
      navigate("/login");
    } else {
      toast.error("Logout failed", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  };

  return (
    <nav className="flex items-center py-2 mt-2 shadow-md">
      <RenderTo
        top={"50%"}
        left={"50%"}
        transform="translate(-50%,-50%)"
        isOpen={isLoading}
      >
        <Loader />
      </RenderTo>
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <img
            src="https://www.svgrepo.com/show/491978/gas-costs.svg"
            height="40"
            width="40"
          />
        </div>
        <LogOut className="cursor-pointer" onClick={handleLogout} size={32} />
      </div>
    </nav>
  );
}
