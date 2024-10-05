/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import verifyIfAuthenticated from "../helpers/isAlreadyAuthenticated";
import { Loader, Navbar } from "./common";

export default function ProtectedRoute({
  adminView: AdminView,
  userView: UserView,
}) {
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState({});

  // Function to handle authentication and role setting
  const authenticateUser = async () => {
    try {
      const { isAuthenticated, roles } = await verifyIfAuthenticated();
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        setUserRoles(roles);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
	  enqueueSnackbar(`Authentication failed: ${error?.message}`, { variant: "error" });
      navigate("/login");
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [navigate]);

  // Show loader until roles are determined
  if (!userRoles.admin && !userRoles.employee) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      {userRoles.admin ? <AdminView /> : <UserView />}
    </>
  );
}
