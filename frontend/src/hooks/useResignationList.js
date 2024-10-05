import { useEffect, useState } from "react";
import { authenticatedInstance } from "../helpers/axiosInstances";
import { enqueueSnackbar } from "notistack";

export const useResignationList = () => {
  const [loading, setLoading] = useState(true);
  const [resignations, setResignations] = useState([]);

  useEffect(() => {
    const fetchResignations = async () => {
      try {
        const {
          data: { data: resignations },
        } = await authenticatedInstance.get("/api/admin/resignations");
        setResignations(resignations);
      } catch (e) {
        enqueueSnackbar(`Failed to fetch resignations: ${e?.message}`, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchResignations();
  }, []);

  const handleApprove = async (payload) => {
    try {
      const response = await authenticatedInstance.put(
        "/api/admin/conclude_resignation",
        payload
      );

      const {
        data: { _id, lwd, approved },
      } = response.data;

      setResignations((prevResignations) =>
        prevResignations.map((resignation) =>
          resignation._id === _id
            ? { ...resignation, approved, lwd }
            : resignation
        )
      );
      enqueueSnackbar("Resignation approved successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Resignation approval failed: ${error?.message}`, {
        variant: "error",
      });
      console.error(error);
    }
  };

  return { loading, resignations, handleApprove };
};
