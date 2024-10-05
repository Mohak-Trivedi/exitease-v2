import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { Loader } from "../common";
import { useResignationList } from "../../hooks/useResignationList";

export const ResignationList = () => {
  const { loading, resignations, handleApprove } = useResignationList();

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ paddingY: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Last Working Day (LWD)
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resignations.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell>{entry.user_id.username}</TableCell>
                <TableCell>{entry.lwd}</TableCell>
                <TableCell>
                  {entry.approved ? (
                    <Chip label="Approved" />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() =>
                        handleApprove({
                          resignationId: entry._id,
                          approved: true,
                          lwd: entry.lwd,
                        })
                      }
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
