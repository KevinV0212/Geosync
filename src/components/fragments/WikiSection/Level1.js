import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import {Typography} from "@mui/material";
import Level2 from "./Level2";


//Passing in PMESII and ASCOPE
function Level1(props) {
   const ASCOPE = [
      "Areas",
      "Structure",
      "Capabilities",
      "Organization",
      "People",
      "Events",
   ];

   return (
      <div>
      {ASCOPE.map((item, i) => (
         <div>
           {props.selected[props.value * 6 + i] && (
           <Accordion >
             <AccordionSummary
               expandIcon={<ArrowDropDownIcon />}
               aria-controls="panel1-content"
               id="panel1-header"
             >
               <Typography >{item}</Typography>
             </AccordionSummary>
             <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
             <AccordionDetails>
               <Typography>
                 <Level2
                 PMESII = {props.currentPMESII}
                 ASCOPE = {item}
                 />
               </Typography>
             </AccordionDetails>
           </Accordion>
       )}
     </div>
   ))}
   </div>
   );
}

export default Level1;
