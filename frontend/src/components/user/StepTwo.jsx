import { Box, Typography } from "@mui/material";

export const StepTwo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ color: "#333" }}>
        Your resignation request is submitted and is pending approval. <br />
        Please wait for HR to review and approve your resignation. <br />
        Please contact HR for any queries.
      </Typography>
    </Box>
  );
};
