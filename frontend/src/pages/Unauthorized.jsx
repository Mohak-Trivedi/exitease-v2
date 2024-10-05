import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" paragraph>
          You do not have permission to view this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
