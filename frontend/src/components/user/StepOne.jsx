/* eslint-disable react/prop-types */
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export const StepOne = ({
  lastWorkingDay,
  setLastWorkingDay,
  handleResignationSubmit,
}) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Before Submitting Your Resignation:
          </Typography>
          <Typography variant="body1" paragraph>
            Have you discussed your decision with your manager or HR to explore
            possible alternatives?
          </Typography>
          <Typography variant="body1" paragraph>
            Ensure you’ve completed any pending tasks or projects to facilitate
            a smooth transition.
          </Typography>
          <Typography variant="body1" paragraph>
            Make sure you’ve reviewed your benefits, including unused leave,
            final paycheck, and health coverage.
          </Typography>
          <Typography variant="body1" paragraph>
            After submission, HR will guide you through the exit process,
            including paperwork and final meetings.
          </Typography>
          <Typography variant="body1" paragraph>
            Resignations are usually final. Take the time to reflect on your
            decision and its impact on your career.
          </Typography>
        </Paper>
      </Box>
      <Box
        component="form"
        onSubmit={handleResignationSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 4,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          type="date"
          label="Last Working Day"
          value={lastWorkingDay}
          onChange={(e) => setLastWorkingDay(e.target.value)}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit Resignation
        </Button>
      </Box>
    </Container>
  );
};
