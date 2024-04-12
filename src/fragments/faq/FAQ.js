import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MapIcon from '@mui/icons-material/Map';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PublishIcon from "@mui/icons-material/Publish";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import DraftsRoundedIcon from "@mui/icons-material/DraftsRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function FAQ() {
   // hi
   return (
      <Stack
         style={{
            maxHeight: "80vh",
            overflowY: "auto",
         }}
      >
         <Typography sx={{ color: "white", fontSize: "20px" }}>
            Frequently Asked Quetions
         </Typography>
         <Accordion>
            <AccordionSummary
               expandIcon={<ArrowDropDownIcon />}
               aria-controls="panel1-content"
               id="panel1-header"
            >
               <QuestionMarkIcon />
               <Typography sx={{ marginLeft: "10px" }}>
                  What is GeoSync?
               </Typography>
            </AccordionSummary>
            <Divider
               variant="middle"
               sx={{ borderBottomWidth: 1, borderColor: "black" }}
            />
            <AccordionDetails>
               <Typography>
                  GeoSync is a Common Operating Picture (COP) designed to provide users an overview of a specific country during their mission analysis.
               </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
               expandIcon={<ArrowDropDownIcon />}
               aria-controls="panel2-content"
               id="panel2-header"
            >
               <MapIcon />
               <Typography sx={{ marginLeft: "10px" }}>
                  What information can be found on GeoSync?
               </Typography>
            </AccordionSummary>
            <Divider
               variant="middle"
               sx={{ borderBottomWidth: 1, borderColor: "black" }}
            />
            <AccordionDetails>
               <Typography>
                  GeoSync provides a central location to access all pertinent information on a country via an interactive map that can show PMESII-PT (Political, Military, Economic, Social, Information, Infrastructure – Physical Environment and Time) / ASCOPE (Area, Structures, Capabilities, Organizations, People, Events) considerations for a specific town, city, region and country, and link to other relevant information
               </Typography>
            </AccordionDetails>
         </Accordion>
         <Accordion>
            <AccordionSummary
               expandIcon={<ArrowDropDownIcon />}
               aria-controls="panel2-content"
               id="panel2-header"
            >
               <CreateIcon />
               <Typography sx={{ marginLeft: "10px" }}>
                  Who can add and edit the information stored?
               </Typography>
            </AccordionSummary>
            <Divider
               variant="middle"
               sx={{ borderBottomWidth: 1, borderColor: "black" }}
            />
            <AccordionDetails>
               <Typography>
                  Information is maintained by Administrators and Managers. To request to be a Manager you must reach out to an Administrator to have your permission changed to Manager.
               </Typography>
            </AccordionDetails>
         </Accordion>
      </Stack>
   );
}
