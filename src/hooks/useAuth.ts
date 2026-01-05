import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state: any) => state.auth);
  return auth?.accessToken;
}
