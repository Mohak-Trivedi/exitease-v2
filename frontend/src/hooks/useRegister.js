import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../helpers/axiosInstances";
import verifyIfAuthenticated from "../helpers/isAlreadyAuthenticated";

export const useRegister = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axiosInstance.post("/api/auth/register", {
        username,
        password,
      });
      enqueueSnackbar(`Registration successful`, {
        variant: "success",
      });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar(`Registration failed: ${error?.message}`, {
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
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  };
};
