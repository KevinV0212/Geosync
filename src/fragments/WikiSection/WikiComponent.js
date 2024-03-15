import { Box, ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import { testEntries } from "../../test_data/wikiTest";
import EntryForm from "../../components/forms/EntryForm";
import Controls from "../../components/reusable/Controls.js";

//selectedPMESII and selectedASCOPE useStates
//Entries
export default function WikiComponent(props) {
   const { selectedASCOPE, selectedPMESII, entries, editButtonFunction } =
      props;
   const PMESII = [
      "political",
      "military",
      "economic",
      "social",
      "information",
      "infrastructure",
   ];
   const ASCOPE = [
      "area",
      "structure",
      "capabilities",
      "organization",
      "people",
      "event",
   ];

   return (
      <Box
         component="main"
         sx={{
            flexGrow: 1,
            background: "#D7CEC7",
            overflowY: "scroll",
            maxHeight: "75vh",
         }}
      >
         {PMESII.map((currentPMESII, i) => (
            <div key={currentPMESII}>
               {props.selectedPMESII[i] && (
                  <Accordion
                     defaultExpanded
                     sx={{ border: 1, borderColor: "black" }}
                  >
                     <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                     >
                        <Typography
                           sx={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                           }}
                        >
                           {currentPMESII}
                        </Typography>
                     </AccordionSummary>
                     <Divider
                        variant="middle"
                        sx={{
                           borderBottomWidth: 1,
                           borderColor: "black",
                        }}
                     />
                     <AccordionDetails>
                        {ASCOPE.map((currentASCOPE, j) => (
                           <div key={`${currentPMESII}${currentASCOPE}`}>
                              {props.selectedASCOPE[i * 6 + j] && (
                                 <Accordion>
                                    <AccordionSummary
                                       expandIcon={<ArrowDropDownIcon />}
                                       aria-controls="panel1-content"
                                       id="panel1-header"
                                    >
                                       <Typography
                                          sx={{ textTransform: "capitalize" }}
                                       >
                                          {currentASCOPE}
                                       </Typography>
                                    </AccordionSummary>
                                    <Divider
                                       variant="middle"
                                       sx={{
                                          borderBottomWidth: 1,
                                          borderColor: "black",
                                       }}
                                    />
                                    <AccordionDetails>
                                       {entries
                                          .filter(
                                             (element) =>
                                                element[currentPMESII] ===
                                                   true &&
                                                element[currentASCOPE] === true
                                          )
                                          .map((entry, k) => (
                                             <Box
                                                sx={{
                                                   display: "flex",
                                                   justifyContent:
                                                      "space-between",
                                                }}
                                             >
                                                <Box>
                                                   <Typography
                                                      sx={{
                                                         textDecoration:
                                                            "underline",
                                                      }}
                                                   >
                                                      {entry.title}
                                                   </Typography>
                                                   <Typography>
                                                      {entry.description}{" "}
                                                   </Typography>
                                                </Box>

                                                {editButtonFunction(entry)}
                                             </Box>
                                          ))}
                                    </AccordionDetails>
                                 </Accordion>
                              )}
                           </div>
                        ))}
                     </AccordionDetails>
                  </Accordion>
               )}
            </div>
         ))}
      </Box>
   );
}
