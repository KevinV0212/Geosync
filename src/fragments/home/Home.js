import React, { useEffect, useState } from "react";
import DocumentForm from "../../components/forms/DocumentForm";
import Box from "@mui/material/Box";

import {
   getAllTasks,
   updateTask,
} from "../../utils/document/task/taskDocUtil";

import {
   getAllMissions,
} from "../../utils/document/mission/missionDocUtil";

import Controls from "../../components/reusable/Controls";
import DocumentInfo from "../../components/info/DocumentInfo";

import { List, ListItem, Stack } from "@mui/material";
import Section from "../../components/Section/Section";
import aiLogo from "../../assets/map.png";

export default function Documents() {
   // Data for document lists
   const [taskDocs, setTaskDocs] = useState([]);
   const [missionDocs, setMissionDocs] = useState([]);

   // Handling form and info popups
   const [formTitle, setFormTitle] = useState("Add Document");
   const [recordForEdit, setRecordForEdit] = useState(null);
   const [recordForView, setRecordForView] = useState(null);
   const [openForm, setOpenForm] = useState(false);
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

   // Function that opens document add/edit form with data of item parameter
   const openInForm = (item) => {
      setRecordForEdit({ ...item });
      setFormTitle("Edit Document");
      setOpenInfo(false);
      setOpenForm(true);
   };

   function navigateToMap() {
      window.location.href = "/map";
   }

   useEffect(() => {
      loadDocuments();
   }, []);

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
               <DocumentInfo
                  recordForView={recordForView}
                  openInForm={openInForm}
               />
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
                  sx={{ height: "100%", flexBasis: 0, flexGrow: 1 }}
               >
                  <List>
                      <Box
                        component="img"
                        src={aiLogo}
                        sx={{
                           width: "400px",
                           display: { xs: "none", lg: "flex" },
                           mr: 1,
                           justify: "center",
                        }}
                        alt="Map logo"
                        onClick={() => {
                           navigateToMap();
                        }}
                     />
                  </List>
               </Section>
            </Stack>
         </Stack>
      </Stack>
   );
}

