import React, { useEffect, useState } from "react";
import "./Documents.css";
import Button from "@mui/material/Button";
import DocumentForm from "../forms/DocumentForm";
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
import Controls from "../controls/Controls";
import AddIcon from "@mui/icons-material/Add";
import DocumentInfo from "../info/DocumentInfo";
import {
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Stack,
   Typography,
} from "@mui/material";

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
            await addMission(document);
         } else if (document.docType === "task") {
            await addTask(document);
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
      <div className="lg-container">
         <Stack>
            {renderManagerControls()}
            <Button onClick={handleViewChange}>
               Change to {managerView ? "user view" : "manager view"}
            </Button>
         </Stack>

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

         <Stack direction="row">
            <List>
               <Typography align="left" variant="h6">
                  Mission Statements
               </Typography>
               {missionDocs.map((document, index) => (
                  <ListItem key={index}>
                     <ListItemButton
                        onClick={() =>
                           openInInfo({ ...document, docType: "mission" })
                        }
                     >
                        <ListItemText align="left" primary={document.title} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
            <List>
               <Typography align="left" variant="h6">
                  Tasks
               </Typography>
               {taskDocs.map((document, index) => (
                  <ListItem key={index}>
                     <ListItemButton
                        onClick={() =>
                           openInInfo({ ...document, docType: "task" })
                        }
                     >
                        <ListItemText align="left" primary={document.title} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Stack>
      </div>
   );
}

export default Documents;
