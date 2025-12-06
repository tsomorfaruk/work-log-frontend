import { useApi } from "@/hooks/useApi";
import { AuthEndpoint } from "@/apis/Auth";
import { CookieManager } from "@/classes/CookieManger";
import Loader from "@/components/common/Loader";

export default function Logout() {
  const { apiRequest, isLoading } = useApi(
    {
      endpoint: AuthEndpoint.logout,
      method: "post",
    },
    true
  );

  const handleLogout = async () => {
    const response = await apiRequest({});
    if (!response.hasError) {
      CookieManager.clear("token");
      navigate("/login");
    }
  };

  if (isLoading)
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
}
