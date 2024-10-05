import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { authenticatedInstance } from "../helpers/axiosInstances";

export const useExitInterviewResponse = () => {
  const [loading, setLoading] = useState(true);
  const [exitInterviews, setExitInterviews] = useState([]);

  useEffect(() => {
    const fetchExitInterviews = async () => {
      try {
        const {
          data: { data: exitInterviews },
        } = await authenticatedInstance.get("/api/admin/exit_responses");
        setExitInterviews(exitInterviews);
      } catch (e) {
        enqueueSnackbar(`Failed to fetch exit interviews: ${e?.message}`, {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExitInterviews();
  }, []);

  return { loading, exitInterviews };
};
