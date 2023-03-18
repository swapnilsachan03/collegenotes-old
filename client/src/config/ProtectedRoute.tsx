import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  isAdmin,
  redirect = "/auth/login",
  redirectAdmin = "/user/profile",
}: any) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (adminRoute && !isAdmin) {
    return <Navigate to={redirectAdmin} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;