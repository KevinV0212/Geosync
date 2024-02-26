import React from "react";
import { testEntries } from "../../../test_data/wikiTest";
import {Box, Typography} from "@mui/material";


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
               <Box sx={{}}>
                  <Typography sx={{textDecoration: 'underline'}}>{item.Title}</Typography>
                  <Typography>{item.Description} </Typography>
               </Box>
               
            ))}
      </div>
   );
}

export default Level2;
