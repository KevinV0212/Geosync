import React, { useEffect, useState } from "react";

import { getAllTasks } from "../../utils/document/task/taskDocUtil";

import { getAllMissions } from "../../utils/document/mission/missionDocUtil";

import DocumentInfo from "../../components/info/DocumentInfo";
import Controls from "../../components/reusable/Controls";

import { List, ListItem, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import MapComponent from "../../components/map-component/MapComponent";
import Section from "../../components/section/Section";

export default function Documents() {
   const navigate = useNavigate();
   const [currentPage, setCurrentPage] = useSessionStorage("currentPage", 0);
   const [currentCountry, setCurrentCountry] = useSessionStorage(
      "currentCountry",
      null
   );

   // Data for document lists
   const [taskDocs, setTaskDocs] = useState([]);
   const [missionDocs, setMissionDocs] = useState([]);

   // Handling document info popups
   const [recordForView, setRecordForView] = useState(null);
   const [openInfo, setOpenInfo] = useState(false);

   // Function that fetches document lists
   const loadDocuments = async () => {
      const tasks = await getAllTasks();
      const missions = await getAllMissions();
      setTaskDocs(tasks);
      setMissionDocs(missions);
   };

   // Function that opens info form with data of item parameter
   const openInInfo = (item) => {
      setRecordForView({ ...item });
      setOpenInfo(true);
   };

   function navigateToMap() {
      setCurrentPage(1);
      navigate("/map");
   }

   useEffect(() => {
      loadDocuments();
   }, [currentCountry]);

   return (
      <Stack
         direction="column"
         sx={{ height: "100%", display: "flex", gap: "1rem" }}
      >
         <Controls.Popup
            title={recordForView ? recordForView.title : ""}
            openPopup={openInfo}
            setOpenPopup={setOpenInfo}
         >
            <DocumentInfo recordForView={recordForView} />
         </Controls.Popup>
         <Stack
            id="documentsWrapper"
            direction="row"
            spacing={2}
            alignItems="stretch"
            sx={{
               maxHeight: "calc(80%-1rem)",

               flexGrow: 1,
               display: "flex",
               alignItems: "stretch",
            }}
         >
            <Stack
               id="documentsContainer"
               direction="row"
               spacing={2}
               sx={{ height: "100%", width: "100%", display: "flex" }}
            >
               <Section
                  title="Mission Statements"
                  padding={2}
                  contentCard
                  sx={{ height: "100%", flexBasis: 0, flexGrow: 1 }}
               >
                  <List>
                     {missionDocs !== null
                        ? missionDocs.map((document, index) => (
                             <ListItem key={index}>
                                <Controls.ListItemButton
                                   text={document.title}
                                   onClick={() =>
                                      openInInfo({
                                         ...document,
                                         docType: "mission",
                                      })
                                   }
                                />
                             </ListItem>
                          ))
                        : undefined}
                  </List>
               </Section>

               <Section
                  title="Tasks"
                  padding={2}
                  contentCard
                  sx={{ height: "100%", flexBasis: 0, flexGrow: 1 }}
               >
                  <List>
                     {taskDocs !== null
                        ? taskDocs.map((document, index) => (
                             <ListItem key={index}>
                                <Controls.ListItemButton
                                   text={document.title}
                                   onClick={() =>
                                      openInInfo({
                                         ...document,
                                         docType: "task",
                                      })
                                   }
                                />
                             </ListItem>
                          ))
                        : undefined}
                  </List>
               </Section>

               <Section
                  title="Map"
                  padding={2}
                  sx={{ height: "100%", flexBasis: 0, flexGrow: 1 }}
               >
                  <MapComponent zoom={1} latitude={0} longitude={0} />
                  <Controls.Button text="Open Map" onClick={navigateToMap} />
               </Section>
            </Stack>
         </Stack>
      </Stack>
   );
}
