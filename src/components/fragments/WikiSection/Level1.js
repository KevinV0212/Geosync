import React from "react";
import { testEntries } from "../../../test_data/wikiTest";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import {Typography} from "@mui/material";


//Passing in PMESII and ASCOPE
function Level1(props) {
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
                  <Typography sx={{marginLeft: '10px'}}>{item.Title}</Typography>
                  <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
                  <Typography>{item.Descritpion} </Typography>
               </div>
               
            ))}
      </div>
   );
}

export default Level1;
