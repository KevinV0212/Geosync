import React from "react";
import "./Documents.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import AddDocument from "../forms/AddDocument";

function Documents() {
   return (
      <div className="lg-container">
         <IconButton
            aria-label="add"
            sx={{ marginTop: 1, position: "absolute", top: 0, left: 0 }}
         >
            <AddIcon />
         </IconButton>
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
                  <li>
                     <a href="#">Mission Statement 1</a>
                  </li>
                  <li>
                     <a href="#">Mission Statement 2</a>
                  </li>
                  <li>
                     <a href="#">Mission Statement 3</a>
                  </li>
               </ul>
            </div>
            <div className="list-container">
               <h2>Tasks</h2>
               <ul className="list2">
                  <li>
                     <a href="#">Task 1</a>
                  </li>
                  <li>
                     <a href="#">Task 2</a>
                  </li>
                  <li>
                     <a href="#">Task 3</a>
                  </li>
               </ul>
            </div>
         </div>
         {/* <AddDocument /> */}
      </div>
   );
}

export default Documents;
