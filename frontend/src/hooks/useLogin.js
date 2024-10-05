import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import {
  axiosInstance,
  authenticatedInstance,
} from "../helpers/axiosInstances";
import verifyIfAuthenticated from "../helpers/isAlreadyAuthenticated";

export const useLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    (async () => {
      let { isAuthenticated } = await verifyIfAuthenticated();
      if (isAuthenticated) {
        navigate("/");
      }
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let {
        data: { roles, token },
      } = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("roles", JSON.stringify(roles));
      Object.assign(authenticatedInstance.defaults, {
        headers: { Authorization: token },
      });
      enqueueSnackbar(`Login successful`, {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(`Login failed: ${error?.message}`, {
        variant: "error",
      });
      console.log(">>", error);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  };
};
