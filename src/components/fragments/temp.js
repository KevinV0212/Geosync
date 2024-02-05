import React, {useState, useMemo, useRef, useEffect} from 'react';
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import './Wiki.css';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, ThemeProvider, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { withStyles } from '@mui/material/styles';
import {makeStyles} from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FaCheck } from "react-icons/fa6";
import "./WikiSection/List.css";
import "./WikiSection/Sidebar.css";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Level1 from "./WikiSection/Level1";


import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

//Overlap boxes

//Searchbar styling
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const drawerWidth = 200;


 const useStyles = makeStyles (() => {
    return ({
        drawerBar: {
          zIndex: '1'
        },
        drawerPaper: {
          paddingTop: '140px',
          justifyContent: 'left'
        }
})});



function Temp() {

  const numbers = [0, 1, 2, 3, 4, 5]

  const [checked, setChecked] = React.useState([true, false]);

    // Country selector
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
      }

    // Map
    const mapElem = useRef(null);

    const theme = useTheme();
    const classes = useStyles(theme);

    const [toggled, setToggled] = useState([true, true, true, true, true, true]);

   const PMESII = [
      "Political",
      "Military",
      "Economic",
      "Social",
      "Information",
      "Infrastructure",
   ];
   const [selectedPMESII, setSelectedPMESII] = useState([
      true,
      true,
      true,
      true,
      true,
      true,
   ]);
   const ASCOPE = [
      "Areas",
      "Structure",
      "Capabilities",
      "Organization",
      "People",
      "Events",
   ];
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

   function toggle(i) {
      const updated = toggled.map((item, index) => {
         if (index === i) {
            return !item;
         } else {
            return item;
         }
      });
      setToggled(updated);
   }

   function onClicker(i) {
     filterPMESII(i)
     numbers.map((item, j) => (
      selectedPMESII[i] === false ? selectedASCOPE[i * 6 + j] = true : selectedASCOPE[i * 6 + j] = false
     ))
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

    

    return (
        <ThemeProvider theme = {theme}>
        <Box sx={{ display: 'flex' }}>
        
        <AppBar sx={{background: "gray", position: 'fixed', marginTop: "80px", boxShadow: '0'}} > 
            <Toolbar className='toolBar'>
                <Select className = 'selector' placeholder="Select a Country" options={options} value={value} />
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <AddIcon/>
                
            </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: 'gray' },
            
          }}
          classes={{paper: classes.drawerPaper}}
          className= {classes.drawerBar}
        >
          <Box sx={{ overflow: 'auto'}}>
            
            <Typography variant='h5' sx={{fontWeight: 'bold', alignSelf: 'center', marginBottom: '10px'}}>Filters</Typography>
            <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black', marginBottom: '5px'}}/>
            
            {PMESII.map((item, i) => (
               <div>
                  <FormControlLabel
                    sx={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginLeft: '1px'}}
                    label={<Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>{item}</Typography>}
                    control={
                      <Checkbox
                      checked= {selectedPMESII[i] === true ? true : false}
                      onClick={() => onClicker(i)}/>
                    }
                  />
                  
                  <Box sx={{ml: 3}}>
                          {ASCOPE.map((item, j) => (
                                <FormControlLabel
                                sx={{display: 'flex', flexDirection: 'row', alignSelf: 'flex-start'}}
                                label={<Typography variant='subtitle2'>{item}</Typography>}
                                control={
                                  <Checkbox
                                  checked= {selectedASCOPE[i * 6 + j] === true}
                                  onClick={() => filterASCOPE(i * 6 + j)}/>
                                }
                              />
                          ))}
                    </Box>
                       
                  </div>
               
            ))}
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {PMESII.map((item, i) => (
            <div>
              {selectedPMESII[i] && (
              <Accordion >
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography sx={{marginLeft: '10px'}}>{item}</Typography>
                </AccordionSummary>
                <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
                <AccordionDetails>
                  <Typography>
                    <Level1
                      current={item}
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
      </ThemeProvider>

    )
}

export default Temp;