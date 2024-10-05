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
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { username, setUsername, password, setPassword, handleSubmit } =
    useLogin();

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
            Login
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link component={RouterLink} to="/register" variant="body2">
              Register here
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
