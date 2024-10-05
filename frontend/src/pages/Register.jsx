import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Link,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { Navbar } from "../components/common";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleSubmit,
  } = useRegister();

  return (
    <>
      <Navbar hideAuthButton />
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" variant="body2">
              Login here
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
