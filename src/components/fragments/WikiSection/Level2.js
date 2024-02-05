import React from "react";
import { testEntries } from "../../../test_data/wikiTest";
import {Typography} from "@mui/material";


//Passing in PMESII and ASCOPE
function Level2(props) {
   return (
      <div>
         {testEntries
            .filter(
               (element) =>
                  element[props.PMESII] === true &&
                  element[props.ASCOPE] === true
            )
            .map((item, i) => (
               <div>
                  <Typography sx={{textDecoration: 'underline'}}>{item.Title}</Typography>
                  <Typography>{item.Description} </Typography>
               </div>
               
            ))}
      </div>
   );
}

export default Level2;
