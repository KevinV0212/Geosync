import React, { useEffect, useState } from "react";
import "./Documents.css";
import DocumentForm from "../../forms/DocumentForm";
import {
   addTask,
   deleteTask,
   getAllTasks,
   updateTask,
} from "../../../utils/document/task/taskDocUtil";
import {
   addMission,
   deleteMission,
   getAllMissions,
   updateMission,
} from "../../../utils/document/mission/missionDocUtil";
import Controls from "../../controls/Controls";
import AddIcon from "@mui/icons-material/Add";
import DocumentInfo from "../../info/DocumentInfo";
import {
   Grid,
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Stack,
   useTheme,
} from "@mui/material";
import Section from "../../Section/Section";

function Documents() {
   const theme = useTheme();

   const [managerView, setManagerView] = useState(true);
   const handleViewChange = () => setManagerView(!managerView);

   const [formTitle, setFormTitle] = useState("Add Document");
   const [recordForEdit, setRecordForEdit] = useState(null);
   const [recordForView, setRecordForView] = useState(null);

   const [openForm, setOpenForm] = useState(false);
   const [openInfo, setOpenInfo] = useState(false);

   const [taskDocs, setTaskDocs] = useState([]);
   const [missionDocs, setMissionDocs] = useState([]);

   const loadDocuments = async () => {
      const tasks = await getAllTasks();
      const missions = await getAllMissions();
      setTaskDocs(tasks);
      setMissionDocs(missions);
   };
   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <Controls.Button
                  text="Add Document"
                  startIcon={<AddIcon />}
                  onClick={() => {
                     setRecordForEdit(null);
                     setFormTitle("Add Document");
                     setOpenForm(true);
                  }}
               />

               <Controls.Popup
                  title={formTitle}
                  openPopup={openForm}
                  setOpenPopup={setOpenForm}
               >
                  <DocumentForm
                     addOrEdit={addOrEdit}
                     recordForEdit={recordForEdit}
                  />
               </Controls.Popup>
            </>
         );
      }
   };

   const openInInfo = (item) => {
      setRecordForView({ ...item });
      setOpenInfo(true);
   };

   const openInForm = (item) => {
      setRecordForEdit({ ...item });
      setFormTitle("Edit Document");
      setOpenInfo(false);
      setOpenForm(true);
   };

   const addOrEdit = async (document, resetForm) => {
      const requestBody = {
         id: document.id || null,
         title: document.title,
         description: document.description,
         link: document.link,
      };
      if (document.id) {
         if (document.docType === "mission") {
            await updateMission(document);
         } else if (document.docType === "task") {
            await updateTask(document);
         }
      } else {
         if (document.docType === "mission") {
            await addMission(requestBody);
         } else if (document.docType === "task") {
            await addTask(requestBody);
         }
      }
      resetForm();
      loadDocuments();
      setRecordForEdit(null);
      setOpenForm(false);
   };

   const deleteDocument = async (document) => {
      if (!window.confirm("Are you sure you want to delete this document?")) {
         return;
      }
      if (document.docType === "mission") {
         await deleteMission(document.id);
      } else if (document.docType === "task") {
         await deleteTask(document.id);
      }
      loadDocuments();
      setRecordForEdit(null);
      setOpenInfo(false);
   };
   useEffect(() => {
      loadDocuments();
   }, []);

   return (
      <Stack
         container
         spacing={3}
         sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
         <Stack direction="row" spacing={2} sx={{ paddingX: 1, flexGrow: 0 }}>
            {renderManagerControls()}
            <Controls.Button
               variant="outlined"
               onClick={handleViewChange}
               text={`${managerView ? "User view" : "manager view"}`}
            ></Controls.Button>

            <Controls.Popup
               title={recordForView ? recordForView.title : ""}
               openPopup={openInfo}
               setOpenPopup={setOpenInfo}
            >
               <DocumentInfo
                  recordForView={recordForView}
                  openInForm={openInForm}
                  deleteDocument={deleteDocument}
               />
            </Controls.Popup>
         </Stack>
         <Grid
            container
            spacing={0}
            sx={{
               flexGrow: 1,
            }}
         >
            <Grid
               item
               sm={12}
               md={6}
               sx={{
                  padding: ".5rem!important",
                  flexGrow: 1,
                  display: "flex",
               }}
            >
               <Section title="Mission Statements">
                  <List>
                     {missionDocs.map((document, index) => (
                        <ListItem key={index}>
                           <Controls.ListItemButton
                              text={document.title}
                              onClick={() =>
                                 openInInfo({ ...document, docType: "mission" })
                              }
                           />
                        </ListItem>
                     ))}
                  </List>
               </Section>
            </Grid>
            <Grid
               item
               sm={12}
               md={6}
               sx={{
                  padding: ".5rem!important",
                  flexGrow: 1,
                  display: "flex",
               }}
            >
               <Section title="Tasks">
                  <List>
                     {taskDocs.map((document, index) => (
                        <ListItem key={index}>
                           <Controls.ListItemButton
                              text={document.title}
                              onClick={() =>
                                 openInInfo({ ...document, docType: "task" })
                              }
                           />
                        </ListItem>
                     ))}
                  </List>
               </Section>
            </Grid>
         </Grid>
      </Stack>
   );
}

export default Documents;
