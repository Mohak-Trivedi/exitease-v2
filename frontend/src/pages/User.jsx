import { Box, Typography, Card, Divider } from "@mui/material";
import { QuestionAnswerList, Loader } from "../components/common";
import { StepOne, StepThree, StepTwo } from "../components/user";
import { useUser } from "../hooks/useUser";

const User = () => {
  const {
    loading,
    lastWorkingDay,
    setLastWorkingDay,
    resigned,
    questionnaire,
    responses,
    selectedResponses,
    setSelectedResponses,
    handleResignationSubmit,
    handleResponseSubmit,
  } = useUser();

  if (loading) {
    return <Loader />;
  }

  if (!resigned) {
    return (
      <StepOne
        lastWorkingDay={lastWorkingDay}
        setLastWorkingDay={setLastWorkingDay}
        handleResignationSubmit={handleResignationSubmit}
      />
    );
  }

  if (!resigned.approved) {
    return <StepTwo />;
  }

  if (questionnaire?.length) {
    return (
      <StepThree
        questionnaire={questionnaire}
        selectedResponses={selectedResponses}
        setSelectedResponses={setSelectedResponses}
        handleResponseSubmit={handleResponseSubmit}
      />
    );
  }

  if (responses?.length) {
    return (
      <Card sx={{ marginY: 2 }}>
        <Typography variant="h6" sx={{ p: 1 }}>
          Resignation process is complete now, here are your exit interviews
          responses.
        </Typography>
        <Divider />
        <Box sx={{ p: 1 }}>
          <QuestionAnswerList responses={responses} />
        </Box>
      </Card>
    );
  }
};

export default User;
