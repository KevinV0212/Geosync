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
import { Grid, List, ListItem, Stack } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Section from "../../Section/Section";

function Documents() {
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
         direction="column"
         spacing={1}
         sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
         <Stack direction="row" spacing={2}>
            {renderManagerControls()}
            <Controls.Button
               variant="outlined"
               startIcon={
                  managerView ? <VisibilityOffIcon /> : <VisibilityIcon />
               }
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
         <Stack
            direction="row"
            spacing={2}
            alignItems="stretch"
            sx={{
               flexGrow: 1,
            }}
         >
            <Section title="Mission Statements" sx={{ flexGrow: 1 }}>
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

            <Section title="Tasks" sx={{ flexGrow: 1 }}>
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
         </Stack>
      </Stack>
   );
}

export default Documents;
