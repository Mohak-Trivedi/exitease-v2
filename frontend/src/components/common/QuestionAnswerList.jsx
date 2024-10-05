/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

export const QuestionAnswerList = ({ responses }) => {
  return (
    <Box>
      {responses.map((response) => (
        <Box key={response._id} sx={{ marginBottom: 2 }}>
          <Typography variant="body1" component="div">
            <strong>Q:</strong> {response.questionText}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>A:</strong> {response.response}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
