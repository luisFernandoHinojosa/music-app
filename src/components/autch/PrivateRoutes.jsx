import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const token = useSelector((store) => store.user.token);

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
