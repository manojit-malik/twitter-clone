import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TweetCard from "../HomeSection/TweetCard";

const ProfileTabs = () => {
  const [tabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    event.preventDefault();
    setTabValue(newValue);
    if (newValue === "1") {
      console.log("User Tweets");
    } else if (newValue === "2") {
      console.log("User Replies");
    } else if (newValue === "3") {
      console.log("Media");
    } else {
      console.log("User Likes");
    }
  };

  return (
    <section>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab label="Posts" value="1" />
              <Tab label="Replies" value="2" />
              <Tab label="Media" value="3" />
              <Tab label="Likes" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ minHeight: "300px", overflow: "hidden" }}>
            {[1].map((item, index) => (
              <TweetCard key={index} />
            ))}
          </TabPanel>
          <TabPanel value="2" sx={{ minHeight: "300px", overflow: "hidden" }}>
            User Tweets
          </TabPanel>
          <TabPanel value="3" sx={{ minHeight: "300px", overflow: "hidden" }}>
            User Replies
          </TabPanel>
          <TabPanel value="4" sx={{ minHeight: "300px", overflow: "hidden" }}>
            User Likes
          </TabPanel>
        </TabContext>
      </Box>
    </section>
  );
};

export default ProfileTabs;
