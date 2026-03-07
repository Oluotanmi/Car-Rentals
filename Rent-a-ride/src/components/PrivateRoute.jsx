import { UseSelector, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";


function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

const isUserOnly =
   currentUser && !currentUser.isAdmin && !currentUser.isVendor;
     return isUserOnly ? <Outlet /> : <Navigate to={"/signin"} />
}

export const PrivateSignin = () => {
    if (!currentUser) {
        //signin or signout available only if there is no current user
        return <Outlet />;
      }
    
}