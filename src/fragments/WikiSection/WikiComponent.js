import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Divider from "@mui/material/Divider";
import { Box } from "@mui/system";
import React from "react";
import Controls from "../../components/reusable/Controls.js";

//selectedPMESII and selectedASCOPE useStates
//Entries
export default function WikiComponent(props) {
   const { entries, openInInfo } = props;

   const PMESII = [
      "political",
      "military",
      "economic",
      "social",
      "information",
      "infrastructure",
   ];
   const ASCOPE = [
      "areas",
      "structures",
      "capabilities",
      "organization",
      "people",
      "events",
   ];

   return (
      <Stack
         spacing={2}
         component="main"
         sx={{
            display: "flex",
            flexGrow: 0,
            flexWrap: "nowrap",
            overflowY: "auto",
         }}
      >
         {PMESII.map((currentPMESII, i) => (
            <div key={currentPMESII}>
               {props.selectedPMESII[i] && (
                  <Accordion defaultExpanded>
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
                        <Stack spacing={2}>
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
                                             sx={{
                                                fontWeight: "bold",
                                                textTransform: "capitalize",
                                             }}
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
                                          <Stack spacing={2}>
                                             {entries
                                                .filter(
                                                   (element) =>
                                                      element[currentPMESII] ===
                                                         true &&
                                                      element[currentASCOPE] ===
                                                         true
                                                )
                                                .map((entry, k) => (
                                                   <Box
                                                      sx={{
                                                         width: "100%",
                                                         display: "flex",
                                                         justifyContent:
                                                            "space-between",
                                                      }}
                                                   >
                                                      <Box
                                                         sx={{
                                                            maxWidth: "80%",
                                                            flexGrow: 1,
                                                         }}
                                                      >
                                                         <Typography
                                                            sx={{
                                                               textDecoration:
                                                                  "underline",
                                                            }}
                                                         >
                                                            {entry.title}
                                                         </Typography>
                                                         <Typography
                                                            sx={{
                                                               whiteSpace:
                                                                  "nowrap",
                                                               textOverflow:
                                                                  "ellipsis",
                                                               overflow:
                                                                  "hidden",
                                                            }}
                                                         >
                                                            {entry.description}
                                                         </Typography>
                                                      </Box>
                                                      <Controls.Button
                                                         text="Open"
                                                         size="small"
                                                         onClick={() =>
                                                            openInInfo({
                                                               ...entry,
                                                               pmesiiCat:
                                                                  currentPMESII,
                                                               ascopeCat:
                                                                  currentASCOPE,
                                                            })
                                                         }
                                                      />
                                                   </Box>
                                                ))}
                                          </Stack>
                                       </AccordionDetails>
                                    </Accordion>
                                 )}
                              </div>
                           ))}
                        </Stack>
                     </AccordionDetails>
                  </Accordion>
               )}
            </div>
         ))}
      </Stack>
   );
}
