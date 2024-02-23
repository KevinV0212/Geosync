import React, { useEffect, useState } from "react";
import "./Documents.css";
import Button from "@mui/material/Button";
import DocumentForm from "../../forms/DocumentForm";
import { addTask, getAllTasks } from "../../../utils/document/taskDocUtil";
import {
   addMission,
   getAllMissions,
   updateMission,
} from "../../../utils/document/missionDocUtil";
import Controls from "../../controls/Controls";
import AddIcon from "@mui/icons-material/Add";
import DocumentInfo from "../../info/DocumentInfo";
import {
   List,
   ListItem,
   ListItemButton,
   ListItemText,
   Stack,
} from "@mui/material";

function Documents() {
   const [managerView, setManagerView] = useState(true);
   const handleViewChange = () => setManagerView(!managerView);

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
                     setOpenForm(true);
                  }}
               />

               <Controls.Popup
                  title="Add/Edit Document"
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
      console.log(item);
      setOpenForm(true);
      setOpenInfo(false);
   };

   const addOrEdit = async (document, resetForm) => {
      if (document.id) {
         console.log("this exists");
         if (document.docType === "mission") {
            updateMission(document);
            window.alert("updateMission");
         } else if (document.docType === "task") {
            // await addTask(document);
            // window.alert("addTask");
         }
      } else {
         if (document.docType === "mission") {
            // await addMission(document);
            window.alert("addMission");
         } else if (document.docType === "task") {
            // await addTask(document);
            // window.alert("addTask");
         }
      }
      resetForm();
      loadDocuments();
      setRecordForEdit(null);
      setOpenForm(false);
   };

   useEffect(() => {
      loadDocuments();
   }, []);

   return (
      <div className="lg-container">
         {renderManagerControls()}
         <Button onClick={handleViewChange}>
            Change to {managerView ? "user view" : "manager view"}
         </Button>

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

         <Stack direction="row">
            <List>
               {missionDocs.map((document, index) => (
                  <ListItem key={index}>
                     <ListItemButton
                        onClick={() =>
                           openInInfo({ ...document, docType: "mission" })
                        }
                     >
                        <ListItemText primary={document.title} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
            <List>
               {taskDocs.map((document, index) => (
                  <ListItem key={index}>
                     <ListItemButton
                        onClick={() =>
                           openInInfo({ ...document, docType: "task" })
                        }
                     >
                        <ListItemText primary={document.title} />
                     </ListItemButton>
                  </ListItem>
               ))}
            </List>
         </Stack>
      </div>
   );
}

export default Documents;
