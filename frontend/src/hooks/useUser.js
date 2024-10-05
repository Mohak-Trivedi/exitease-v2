import { useEffect, useState } from "react";
import { authenticatedInstance } from "../helpers/axiosInstances";
import { enqueueSnackbar } from "notistack";

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const [resigned, setResigned] = useState(null);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedResponses, setSelectedResponses] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: {
            data: { resignation, questionnaire, responses },
          },
        } = await authenticatedInstance.get("/api/user/resignation");
        setResigned(resignation);
        setQuestionnaire(questionnaire);
        setResponses(responses);
      } catch (e) {
        enqueueSnackbar(`Failed to fetch resignation data: ${e?.message}`, {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResignationSubmit = async (e) => {
    e.preventDefault();
    if (lastWorkingDay) {
      try {
        setLoading(true);
        const {
          data: {
            data: { resignation, questionnaire, responses },
          },
        } = await authenticatedInstance.post("/api/user/resign", {
          lwd: lastWorkingDay,
        });
        setResigned(resignation);
        setQuestionnaire(questionnaire);
        setResponses(responses);
        enqueueSnackbar("Resignation submitted successfully", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(`Resignation submission failed: ${error?.message}`, {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const request = async (api, payload) => {
    try {
      let {
        data: {
          data: { resignation, questionnaire, responses },
        },
      } = await authenticatedInstance.post(api, payload);
      setResigned(resignation);
      setQuestionnaire(questionnaire);
      setResponses(responses);
    } catch (e) {
      console.log(e);
    }
  };

  const handleResponseSubmit = async () => {
    try {
      setLoading(true);
      const questionIds = Object.keys(selectedResponses);
      const questionsText = {};
      questionIds.forEach((id) => {
        questionnaire.some(({ _id, questionText }) => {
          if (_id === id) {
            questionsText[id] = questionText;
            return true;
          }
        });
      });
      const payload = questionIds.map((id) => ({
        questionText: questionsText[id],
        response: selectedResponses[id],
      }));
      await request("/api/user/responses", {
        responses: payload,
      });
      enqueueSnackbar("Responses submitted successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Response submission failed: ${error?.message}`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
