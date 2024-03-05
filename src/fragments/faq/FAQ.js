import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PublishIcon from '@mui/icons-material/Publish';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import ContactMailRoundedIcon from '@mui/icons-material/ContactMailRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import Divider from '@mui/material/Divider';

export default function FAQ() {


  return ( 
    <div style={{backgroundColor: 'black', height: 'calc(100vh - 80px)', width: '100%', flexDirection: 'column', display: 'flex'}}>
      <Typography sx={{color: 'white', fontSize: '20px'}}>Frequently Asked Quetions</Typography>
      <Accordion >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <PublishIcon />
          <Typography sx={{marginLeft: '10px'}}>How do I submit a report?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <EditNoteRoundedIcon/>
          <Typography sx={{marginLeft: '10px'}}>Can I edit a submitted report?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <LocalPrintshopRoundedIcon/>
          <Typography sx={{marginLeft: '10px'}}>How can I print a report assessment?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <DraftsRoundedIcon/>
          <Typography sx={{marginLeft: '10px'}}>How long does a Draft Report stay in my account?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <ContactMailRoundedIcon/>
          <Typography sx={{marginLeft: '10px'}}>How do I come in contact if I have an issue?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <GroupRoundedIcon/>
          <div></div>
          <Typography sx={{marginLeft: '10px'}}>How can I be apart of the web app team?</Typography>
        </AccordionSummary>
        <Divider variant= 'middle' sx={{borderBottomWidth: 1, borderColor: 'black'}}/>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    
  <Typography sx={{backgroundColor: 'white', marginTop: 'auto', borderRadius: '2px'}}>Have feedback for us? Contact Us.</Typography>
  </div>
  );
}
