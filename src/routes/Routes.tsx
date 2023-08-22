import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import MainRoutes from "./main";
import AuthRoutes from "./Auth";

export default function Routes() {
  const user = useSelector((state: RootState) => state.user.user);

  const isLoggedIn = !!user;

  return <>
    {!isLoggedIn && <AuthRoutes />}
    {isLoggedIn && <MainRoutes />}
  </>
}