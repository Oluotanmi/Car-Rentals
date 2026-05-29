import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

    const isUserOnly =
      currentUser && !currentUser.isAdmin && !currentUser.isVendor;
      return isUserOnly ? <Outlet /> : <Navigate to = { "/signin"} />;

}

export const PrivateSignin = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        //signin or signout available only if there is no current user
        return <Outlet />;
      }

      if (currentUser.isAdmin) {

        return <Navigate to="/adminDashboard" />;
    
      } else if (currentUser.isVendor) {
    
        return <Navigate to="/vendorDashboard" />;
    
      } else {
    
        return <Navigate to="/" />;
        
      }
};

export default PrivateRoute;

