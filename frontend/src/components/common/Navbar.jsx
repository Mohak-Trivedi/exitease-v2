/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { authenticatedInstance } from "../../helpers/axiosInstances";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = ({ hideAuthButton }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    try {
      localStorage.clear();
      Object.assign(authenticatedInstance.defaults, {
        headers: { Authorization: null },
      });

      navigate("/login");
    } catch (error) {
      enqueueSnackbar(`Logout failed: ${error?.message}`, {
        variant: "error",
      });
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ borderRadius: "12px" }}>
      <Toolbar>
        <MeetingRoomIcon sx={{ display: { md: "flex" }, mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ExitEase
        </Typography>
        {!hideAuthButton && <Box>
          <Button
            color="inherit"
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>}
      </Toolbar>
    </AppBar>
  );
}
