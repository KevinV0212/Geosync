import React, { useEffect, useState } from "react";
import "./Documents.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddDocument from "../forms/AddDocument";
import BasicModal from "./BasicModal";
import { getAllTasks } from "../../utils/taskDocUtil";
import TaskDocument from "../TaskDocument";
import { getAllMissions } from "../../utils/missionDocUtil";
function Documents() {
   const [taskDocs, setTaskDocs] = useState([]);
   const [missionDocs, setMissionDocs] = useState([]);

   const loadTaskDocs = () => {
      getAllTasks().then((taskDocList) => setTaskDocs(taskDocList));
   };

   const loadMissionDocs = () => {
      getAllMissions().then((missionDocList) => setMissionDocs(missionDocList));
   };

   useEffect(() => {
      loadTaskDocs();
      loadMissionDocs();
   }, []);
   return (
      <div className="lg-container">
         <IconButton
            aria-label="add"
            sx={{ marginTop: 1, position: "absolute", top: 0, left: 0 }}
         >
            <AddIcon />
         </IconButton>

         <BasicModal buttonText="Add Document">
            <AddDocument onReload={loadTaskDocs} />
         </BasicModal>
         <Button
            variant="outlined"
            size="small"
            sx={{ marginTop: 1.5, marginLeft: -140 }}
         >
            Edit
         </Button>
         <div className="lists-container">
            <div className="list-container">
               <h2>Mission Statement</h2>
               <ul className="list1">
                  {missionDocs.map((doc) => (
                     <li key={doc.id}>
                        <TaskDocument id={doc.id} link={doc.link} />
                     </li>
                  ))}
               </ul>
            </div>
            <div className="list-container">
               <h2>Tasks</h2>
               <ul className="list2">
                  {taskDocs.map((doc) => (
                     <li key={doc.id}>
                        <TaskDocument id={doc.id} link={doc.link} />
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {/* <AddDocument /> */}
      </div>
   );
}

export default Documents;
