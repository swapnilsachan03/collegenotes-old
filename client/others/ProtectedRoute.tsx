import { useRouter } from "next/router";

const ProtectedRoute = (WrappedComponent: any,
  userRoute=true,
  adminRoute=false,
  redirect="/auth/login",
  adminRedirect="/user/profile"
) => {

  return (props: any) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const { isAuthenticated } = props;
      const { isAdmin } = props;

      if (userRoute === !isAuthenticated) {
        Router.replace(redirect);
        return null;
      }

      if (adminRoute && !isAdmin) {
        Router.replace(adminRedirect);
        return null;
      }

      // If condition is satisfied we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default ProtectedRoute;