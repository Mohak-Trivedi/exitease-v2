/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { ExitInterviewResponse, ResignationList } from "../components/admin";

const TabPanel = (props) => {
  const { value, index, show } = props;

  if (value !== index) {
    return null;
  }

  return show === "resignations" ? (
    <ResignationList />
  ) : (
    <ExitInterviewResponse />
  );
};

const Admin = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h2" fontSize={24} padding={2} fontWeight="bold">
        Hello, Admin!
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              color: "black",
              borderBottom: "none",
              "&.Mui-selected": {
                borderBottom: "2px solid black",
                color: "black",
              },
              "&:hover": {
                color: "gray",
              },
            },
          }}
        >
          <Tab label="Resignations List" />
          <Tab label="Exit Interviews (Responses)" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0} show="resignations">
        <ResignationList />
      </TabPanel>
      <TabPanel value={value} index={1} show="exitInterviews">
        <ExitInterviewResponse />
      </TabPanel>
    </Box>
  );
};

export default Admin;
