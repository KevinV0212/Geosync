import React, { useEffect, useState } from "react";
import DocumentForm from "../../components/forms/DocumentForm";

import {
   addTask,
   deleteTask,
   getAllTasks,
   updateTask,
} from "../../utils/document/task/taskDocUtil";

import {
   addMission,
   deleteMission,
   getAllMissions,
   updateMission,
} from "../../utils/document/mission/missionDocUtil";

import Controls from "../../components/reusable/Controls";
import DocumentInfo from "../../components/info/DocumentInfo";

import { List, ListItem, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Section from "../../components/section/Section";

export default function Documents() {
   // Handling manager view
   const [managerView, setManagerView] = useState(true);
   const handleViewChange = () => setManagerView(!managerView);

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

   // Function that sends request to add/edit form with data from document
   // After the request, it resets the form and refreshes the document lists
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

   // Function that sends request to delete document passed in as a parameter
   // After deleting, it closes that document's info box and refreshes document lists
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

   // Function that renders manager specific controls
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

   useEffect(() => {
      loadDocuments();
   }, []);

   return (
      <Stack
         direction="column"
         sx={{ height: "100%", display: "flex", gap: "1rem" }}
      >
         <Stack id="managerControls" direction="row" spacing={2}>
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
                  editable={managerView}
               />
            </Controls.Popup>
         </Stack>
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
            </Stack>
         </Stack>
      </Stack>
   );
}
