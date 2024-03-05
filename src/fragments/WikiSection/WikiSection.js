import { Box, ThemeProvider } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Select from "react-select";
import FormControl from "@mui/material/FormControl";
import { useLocalStorage } from "usehooks-ts";
import Level1 from "./Level1";
import { createTheme } from "@mui/material/styles";
import { getAllCountries } from "../../utils/country/countryUtil";
import { getWikiEntries } from "../../utils/wiki/wikiUtil";

const numbers = [0, 1, 2, 3, 4, 5];

const PMESII = [
   "Political",
   "Military",
   "Economic",
   "Social",
   "Information",
   "Infrastructure",
];
const ASCOPE = [
   "Areas",
   "Structure",
   "Capabilities",
   "Organization",
   "People",
   "Events",
];

function NewDesign() {
   const [currentCountry, setCurrentCountry] = useState(null);
   const [countries, setCountries] = useState([]);

   const [wikiEntries, setWikiEntries] = useState([]);
   const [managerView, setManagerView] = useState(true);

   const handleViewChange = () => setManagerView(!managerView);

   let listOptions = countries.map((country) => ({
      value: country.id,
      label: country.countryName,
   }));

   const loadCountries = async () => {
      const countries = await getAllCountries();
      if (countries == null) {
         return;
      }
      countries.sort((countryA, countryB) => {
         if (countryA.countryName < countryB.countryName) return -1;
         if (countryA.countryName > countryB.countryName) return 1;
         return 0;
      });
      setCountries([...countries]);
   };

   // loads wiki entries associated to the currently selected country
   const loadWikiEntries = async () => {
      if (!currentCountry) {
         return;
      }
      const countryID = currentCountry.countryID;
      const entryList = await getWikiEntries(countryID);
      if (entryList === null) {
         return;
      }
      setWikiEntries([...entryList]);
   };

   // Callback function to handle selecting country
   const handleCountrySelect = (country) => {
      const countryInfo = countries.find(
         (targetCountry) => targetCountry.id === country.value
      );

      const temp = {
         countryID: countryInfo.id,
         countryName: countryInfo.countryName,
         latitude: countryInfo.latitude,
         longitude: countryInfo.longitude,
      };
      setCurrentCountry(temp);
   };

   const [selectedASCOPE, setSelectedASCOPE] = useState([
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
   ]);
   const [selectedPMESII, setSelectedPMESII] = useState([
      true,
      true,
      true,
      true,
      true,
      true,
   ]);
   function filterASCOPE(i) {
      const updated = selectedASCOPE.map((item, index) => {
         if (index === i) {
            return !item;
         } else {
            return item;
         }
      });
      setSelectedASCOPE(updated);
   }
   function onClicker(i) {
      filterPMESII(i);
      numbers.map((item, j) =>
         selectedPMESII[i] === false
            ? (selectedASCOPE[i * 6 + j] = true)
            : (selectedASCOPE[i * 6 + j] = false)
      );
   }
   function filterPMESII(i) {
      const updated = selectedPMESII.map((item, index) => {
         if (index === i) {
            return !item;
         } else {
            return item;
         }
      });
      setSelectedPMESII(updated);
   }

   const theme = createTheme({
      typography: {
         fontFamily: "roboto",
      },
      components: {
         MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'roboto';}
            `,
         },
      },
   });

   useEffect(() => {
      loadCountries();
      loadWikiEntries();
   }, [currentCountry]);

   return (
      <ThemeProvider theme={theme}>
         <Box
            sx={{
               height: "calc(100vh - 80px)",
               bgcolor: "white",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <Box
               sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "90%",
                  height: "86%",
                  border: 2,
                  borderColor: "black",
                  bgcolor: "white",
               }}
            >
               <Box
                  sx={{
                     alignItems: "center",
                     overflowY: "scroll",
                     display: "flex",
                     flexDirection: "column",
                     width: "20%",
                     height: "94%",
                     borderRadius: 2,
                     bgcolor: "#d5d5d7",
                  }}
               >
                  <Box
                     sx={{
                        bgcolor: "black",
                        width: "90%",
                        borderRadius: 1,
                        marginTop: "10px",
                        marginBottom: "5px",
                     }}
                  >
                     <Typography variant="h5" sx={{ color: "white" }}>
                        Filters
                     </Typography>
                  </Box>
                  <Box sx={{ width: "90%" }}>
                     {PMESII.map((item, i) => (
                        <div key={i}>
                           <Accordion sx={{ border: 1, borderColor: "black" }}>
                              <AccordionSummary
                                 expandIcon={<ArrowDropDownIcon />}
                                 aria-controls="panel1-content"
                                 id="panel1-header"
                              >
                                 <FormControlLabel
                                    sx={{
                                       display: "flex",
                                       flexDirection: "row",
                                       alignSelf: "flex-start",
                                    }}
                                    label={
                                       <Typography sx={{ fontWeight: "bold" }}>
                                          {item}
                                       </Typography>
                                    }
                                    control={
                                       <Checkbox
                                          checked={
                                             selectedPMESII[i] === true
                                                ? true
                                                : false
                                          }
                                          onClick={() => onClicker(i)}
                                          style={{
                                             color: "#690005",
                                          }}
                                       />
                                    }
                                 />
                              </AccordionSummary>
                              <Divider
                                 variant="middle"
                                 sx={{
                                    borderBottomWidth: 1,
                                    borderColor: "black",
                                 }}
                              />
                              <AccordionDetails>
                                 {ASCOPE.map((item, j) => (
                                    <FormControlLabel
                                       key={j}
                                       sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          alignSelf: "flex-start",
                                       }}
                                       label={<Typography>{item}</Typography>}
                                       control={
                                          <Checkbox
                                             checked={
                                                selectedASCOPE[i * 6 + j] ===
                                                true
                                             }
                                             onClick={() =>
                                                filterASCOPE(i * 6 + j)
                                             }
                                             style={{
                                                color: "#690005",
                                             }}
                                          />
                                       }
                                    />
                                 ))}
                              </AccordionDetails>
                           </Accordion>
                        </div>
                     ))}
                  </Box>
               </Box>
               <Box
                  sx={{
                     width: "76%",
                     height: "94%",
                     borderRadius: 1,
                     bgcolor: "#d5d5d7",
                     flexDirection: "column",
                     alignItems: "center",
                     display: "flex",
                  }}
               >
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "94%",
                        marginTop: "10px",
                        marginBottom: "10px",
                     }}
                  >
                     <FormControl
                        sx={{
                           width: 400,
                           fontFamily: "inter",
                           marginTop: "5px",
                        }}
                     >
                        <Select
                           placeholder="Select a Country"
                           options={listOptions}
                           value={
                              currentCountry
                                 ? {
                                      value: currentCountry.countryID,
                                      label: currentCountry.countryName,
                                   }
                                 : null
                           }
                           onChange={handleCountrySelect}
                        />
                     </FormControl>

                     <Button
                        variant="contained"
                        sx={{
                           width: 125,
                           background: "#690005",
                           maxHeight: "50px",
                           ":hover": {
                              bgcolor: "black",
                              color: "white",
                           },
                        }}
                     >
                        <Typography>
                           Edit <br />
                           Country
                        </Typography>
                     </Button>
                     <Button
                        variant="contained"
                        sx={{
                           width: 125,
                           background: "#690005",
                           maxHeight: "50px",
                           ":hover": {
                              bgcolor: "black",
                              color: "white",
                           },
                        }}
                     >
                        <Typography>
                           New <br />
                           Country
                        </Typography>
                     </Button>
                     <Button
                        variant="contained"
                        sx={{
                           width: 125,
                           background: "#690005",
                           maxHeight: "50px",
                           ":hover": {
                              bgcolor: "black",
                              color: "white",
                           },
                        }}
                     >
                        <Typography sx={{ fontFamily: "inter" }}>
                           New <br />
                           Entry
                        </Typography>
                     </Button>
                     <Button
                        variant="contained"
                        sx={{
                           background: "transparent",
                           border: 1,
                           borderColor: "#690005",
                           color: "#690005",
                           maxHeight: "50px",
                           ":hover": {
                              bgcolor: "black",
                              color: "white",
                           },
                        }}
                     >
                        <Typography>
                           User <br />
                           View
                        </Typography>
                     </Button>
                  </Box>

                  <Box
                     component="main"
                     sx={{
                        flexGrow: 1,
                        background: "#D7CEC7",
                        width: "94%",
                        overflowY: "scroll",
                     }}
                  >
                     {PMESII.map((item, i) => (
                        <div key={i}>
                           {selectedPMESII[i] && (
                              <Accordion
                                 defaultExpanded
                                 sx={{ border: 1, borderColor: "black" }}
                              >
                                 <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                 >
                                    <Typography sx={{ fontWeight: "bold" }}>
                                       {item}
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
                                    <Typography>
                                       <Level1
                                          currentPMESII={item}
                                          selected={selectedASCOPE}
                                          value={i}
                                       />
                                    </Typography>
                                 </AccordionDetails>
                              </Accordion>
                           )}
                        </div>
                     ))}
                  </Box>
               </Box>
            </Box>
         </Box>
      </ThemeProvider>
   );
}

export default NewDesign;
