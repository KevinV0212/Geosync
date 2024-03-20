import React, { useState, useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import {
   addCountry,
   deleteCountry,
   getAllCountries,
   updateCountry,
} from "../../utils/country/countryUtil.js";
import {
   getWikiEntries,
   addWikiEntry,
   deleteWikiEntry,
   updateWikiEntry,
} from "../../utils/wiki/wikiUtil.js";
import { Box, Stack } from "@mui/material";
import Section from "../../components/Section/Section.js";
import Controls from "../../components/reusable/Controls.js";
import EntryForm from "../../components/forms/EntryForm.js";
import CountryForm from "../../components/forms/CountryForm.js";
import Select from "react-select";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import WikiComponent from "../WikiSection/WikiComponent.js";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import WikiEntryInfo from "../../components/info/WikiEntryInfo.js";

export default function WikiFragment() {
   const theme = useTheme();

   // Handling manager view
   const [managerView, setManagerView] = useState(true);
   const handleViewChange = () => setManagerView(!managerView);

   // Data for country
   const [currentCountry, setCurrentCountry] = useSessionStorage(
      "currentCountry",
      null
   );
   const [countries, setCountries] = useState([]);
   // const [currentCountry, setCurrentCountry] = useState(null);
   let listOptions = countries.map((country) => ({
      value: country.id,
      label: country.countryName,
   }));

   // Data for wikiEntries
   const [wikiEntries, setWikiEntries] = useState([]);

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
      const numbers = [0, 1, 2, 3, 4, 5];
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

   // Function that fetches list of all mapPins associated with currentCountry
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

   // Handling country form popup
   const [openCountryForm, setOpenCountryForm] = useState(false);
   const [countryFormTitle, setCountryFormTitle] = useState("Add Country");
   const [recordForCountry, setRecordForCountry] = useState(null);

   // Handling entry form and info popups
   const [EntryFormTitle, setFormTitle] = useState("Add Entry");
   const [recordForEdit, setRecordForEdit] = useState(null);
   const [recordForView, setRecordForView] = useState(null);
   const [openForm, setOpenForm] = useState(false);
   const [openInfo, setOpenInfo] = useState(false);

   // Function that fetches list of all countries
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

   // Function that opens country form with data of current country
   const openCountryInForm = () => {
      setRecordForCountry({
         ...currentCountry,
      });
      setCountryFormTitle("Edit Country");
      setOpenCountryForm(true);
   };

   // Function that sends request to add/edit country with data from country
   // After the request, it resets the form and refreshes the country lists
   const addOrEditCountry = async (country, resetForm) => {
      const requestBody = {
         id: country.countryID || null,
         countryName: country.countryName,
         latitude: +country.latitude,
         longitude: +country.longitude,
      };
      console.log(requestBody);

      if (requestBody.id) {
         await updateCountry(requestBody);
         const newCountry = await addCountry(requestBody);
         if (newCountry) {
            setCurrentCountry({
               countryID: requestBody.id,
               countryName: newCountry.countryName,
               latitude: +newCountry.latitude,
               longitude: +newCountry.longitude,
            });
         }
      } else {
         const newCountry = await addCountry(requestBody);
         if (newCountry && currentCountry == null) {
            setCurrentCountry({
               countryID: requestBody.id,
               countryName: newCountry.countryName,
               latitude: +newCountry.latitude,
               longitude: +newCountry.longitude,
            });
         }
      }
      resetForm();
      loadCountries();
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // Function that sends request to delete country passed in as a parameter
   // After deleting, it closes country form and refreshes country lists
   const deleteCountry = async (country) => {
      if (!window.confirm("Are you sure you want to delete this country?")) {
         return;
      }
      await deleteCountry(country.countryID);
      loadCountries();
      loadWikiEntries();
      setCurrentCountry(null);
      setRecordForCountry(null);
      setOpenCountryForm(false);
   };

   // Function that opens info form with data of item parameter
   const openEntryInInfo = (item) => {
      setRecordForView({ ...item });
      setOpenInfo(true);
   };

   // Function that opens entry add/edit form with data of currently selected pin
   const openEntryInForm = (item) => {
      setRecordForEdit({ ...item });
      setFormTitle("Edit Entry");
      setOpenInfo(false);
      setOpenForm(true);
   };

   // Function that sends request to add/edit form with data from entry
   // After the request, it resets the form and refreshes the wiki
   const addOrEditEntry = async (entry, resetForm) => {
      let requestBody = {
         countryID: currentCountry.countryID,
         title: entry.title,
         description: entry.description,
         political: false,
         military: false,
         economic: false,
         social: false,
         information: false,
         infrastructure: false,
         areas: false,
         structures: false,
         capabilities: false,
         organization: false,
         people: false,
         events: false,
      };
      requestBody[entry.pmesiiCat] = true;
      requestBody[entry.ascopeCat] = true;

      if (entry.id) {
         await updateWikiEntry(requestBody);
      } else {
         await addWikiEntry(requestBody);
      }
      resetForm();
      loadWikiEntries();
      setRecordForEdit(null);
      setOpenForm(false);
   };

   // Function that sends request to delete entry passed in as a parameter
   // After deleting, it closes that entry's info box and refreshes wiki
   const deleteEntry = async (entry) => {
      if (!window.confirm("Are you sure you want to delete this document?")) {
         return;
      }
      // console.log("delete", entry.id);
      await deleteWikiEntry(entry.id);
      loadWikiEntries();
      setRecordForEdit(null);
      setOpenInfo(false);
      // reload wiki
   };

   // const renderEditButton = (entry) => {
   //    return (
   //       <>
   //          <Controls.Button
   //             text="Edit"
   //             onClick={() => {
   //                setRecordForEdit(entry);
   //                setFormTitle("Edit Entry");
   //                setOpenForm(true);
   //             }}
   //          />
   //          <Controls.Popup
   //             title={EntryFormTitle}
   //             openPopup={openForm}
   //             setOpenPopup={setOpenForm}
   //          >
   //             <EntryForm
   //                addOrEdit={addOrEditEntry}
   //                recordForEdit={recordForEdit}
   //             />
   //          </Controls.Popup>
   //       </>
   //    );
   // };

   // Function to handle country selector
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
   // Function that renders manager specific controls
   const renderManagerControls = () => {
      if (managerView) {
         return (
            <>
               <Controls.Button
                  text="Add Country"
                  size="small"
                  onClick={() => {
                     setRecordForCountry(null);
                     setCountryFormTitle("Add Country");
                     setOpenCountryForm(true);
                  }}
               />
               <Controls.Button
                  text="Edit Country"
                  size="small"
                  onClick={openCountryInForm}
                  disabled={currentCountry == null}
               />
               <Controls.Popup
                  title={countryFormTitle}
                  openPopup={openCountryForm}
                  setOpenPopup={setOpenCountryForm}
               >
                  <CountryForm
                     addOrEdit={addOrEditCountry}
                     recordForEdit={recordForCountry}
                     deleteCountry={deleteCountry}
                  />
               </Controls.Popup>

               <Controls.Button
                  text="Add Entry"
                  size="small"
                  onClick={() => {
                     setRecordForEdit(null);
                     setFormTitle("Add Entry");
                     setOpenForm(true);
                  }}
                  disabled={currentCountry == null}
               />
               <Controls.Popup
                  title={EntryFormTitle}
                  openPopup={openForm}
                  setOpenPopup={setOpenForm}
               >
                  <EntryForm
                     addOrEdit={addOrEditEntry}
                     recordForEdit={recordForEdit}
                  />
               </Controls.Popup>
            </>
         );
      }
   };

   useEffect(() => {
      loadCountries();
      loadWikiEntries();
   }, [currentCountry]);

   return (
      <Stack
         id="pageContainer"
         direction="row"
         spacing={2}
         alignItems="stretch"
      >
         <Section
            title="Filters"
            padding={2}
            contentCard
            sx={{ overflowY: "auto" }}
         >
            {PMESII.map((item, i) => (
               <div key={i}>
                  <Accordion
                     defaultExpanded
                     sx={{
                        background: "transparent",
                        boxShadow: "none",
                        disableGutters: "true",
                        margin: "auto",
                     }}
                  >
                     <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{ maxHeight: "30px" }}
                     >
                        <Controls.Checkbox
                           text={item}
                           checked={selectedPMESII[i] === true ? true : false}
                           onClick={() => onClicker(i)}
                        />
                     </AccordionSummary>
                     <Divider
                        variant="middle"
                        sx={{
                           borderBottomWidth: 1,
                           borderColor: "black",
                        }}
                     />
                     <AccordionDetails
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           alignSelf: "flex-start",
                        }}
                     >
                        {ASCOPE.map((item, j) => (
                           <Controls.Checkbox
                              key={i + j}
                              text={item}
                              checked={selectedASCOPE[i * 6 + j] === true}
                              onClick={() => filterASCOPE(i * 6 + j)}
                              sx={{ marginLeft: "10px" }}
                           />
                        ))}
                     </AccordionDetails>
                  </Accordion>
               </div>
            ))}
         </Section>

         {/* <Stack direction="column" spacing={2}>
            <Box
               sx={{
                  overflowY: "scroll",
                  maxHeight: "60vh",
                  backgroundColor: theme.palette.lightGray.main,
               }}
            >
               <Stack direction="column" spacing={0}>
                  <Box
                     sx={{
                        m: 2,
                        padding: 1,
                        bgcolor: "black",
                        borderRadius: 1,
                     }}
                  >
                     <Typography
                        variant="h6"
                        component="h2"
                        align="center"
                        color="common.white"
                     >
                        Filters
                     </Typography>
                  </Box>
                  {PMESII.map((item, i) => (
                     <div key={i}>
                        <Accordion
                           defaultExpanded
                           sx={{
                              background: "transparent",
                              boxShadow: "none",
                              disableGutters: "true",
                              margin: "auto",
                           }}
                        >
                           <AccordionSummary
                              expandIcon={<ArrowDropDownIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                              sx={{ maxHeight: "30px" }}
                           >
                              <Controls.Checkbox
                                 text={item}
                                 checked={
                                    selectedPMESII[i] === true ? true : false
                                 }
                                 onClick={() => onClicker(i)}
                              />
                           </AccordionSummary>
                           <Divider
                              variant="middle"
                              sx={{
                                 borderBottomWidth: 1,
                                 borderColor: "black",
                              }}
                           />
                           <AccordionDetails
                              sx={{
                                 display: "flex",
                                 flexDirection: "column",
                                 alignSelf: "flex-start",
                              }}
                           >
                              {ASCOPE.map((item, j) => (
                                 <Controls.Checkbox
                                    key={i + j}
                                    text={item}
                                    checked={selectedASCOPE[i * 6 + j] === true}
                                    onClick={() => filterASCOPE(i * 6 + j)}
                                    sx={{ marginLeft: "10px" }}
                                 />
                              ))}
                           </AccordionDetails>
                        </Accordion>
                     </div>
                  ))}
               </Stack>
            </Box>
         </Stack> */}

         <Section padding={2} sx={{ minWidth: "500px", flexGrow: 1 }}>
            <Stack
               direction="row"
               spacing={2}
               sx={{ width: "100%", display: "flex" }}
            >
               <Box sx={{ flexGrow: 1 }}>
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
               </Box>
               <Stack direction="row" spacing={1}>
                  {renderManagerControls()}

                  <Controls.Button
                     variant="outlined"
                     text={`${managerView ? "User view" : "Manager view"}`}
                     onClick={handleViewChange}
                  />

                  <Controls.Popup
                     title={recordForView ? recordForView.title : ""}
                     openPopup={openInfo}
                     setOpenPopup={setOpenInfo}
                  >
                     <WikiEntryInfo
                        recordForView={recordForView}
                        openInForm={openEntryInForm}
                        deleteEntry={deleteEntry}
                        editable={managerView}
                     />
                  </Controls.Popup>
               </Stack>
            </Stack>

            <WikiComponent
               selectedASCOPE={selectedASCOPE}
               selectedPMESII={selectedPMESII}
               entries={wikiEntries}
               // editButtonFunction={renderEditButton}
               openInInfo={openEntryInInfo}
            />
         </Section>
      </Stack>
   );
}
