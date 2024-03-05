import React, { useEffect, useState } from "react";
import Controls from "../reusable/Controls";
import { Divider, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialInfo = {
   id: "",
   link: "",
   title: "",
   description: "",
   docType: "",
};

export default function DocumentInfo(props) {
   // Handling form data
   const [info, setInfo] = useState(initialInfo);
   const {
      recordForView,
      openInForm,
      deleteDocument,
      editable = false,
   } = props;

   useEffect(() => {
      if (recordForView != null) {
         setInfo({ ...recordForView });
      }
   }, [recordForView]);

   return (
      <Stack spacing={2}>
         <Typography
            align="left"
            width={1}
            paragraph
            sx={{ wordWrap: "break-word" }}
         >
            {info.description}
         </Typography>
         <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography align="left" width={1} noWrap>
               {info.link}
            </Typography>
            {/* <Controls.IconButton>
               <ContentCopyIcon />
            </Controls.IconButton> */}
            <a href={info.link} target="_blank" rel="noreferrer">
               <Controls.IconButton>
                  <OpenInNewIcon />
               </Controls.IconButton>
            </a>
         </Stack>
         <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            divider={<Divider orientation="vertical" flexItem />}
         >
            {editable ? (
               <>
                  <Controls.Button
                     variant="outlined"
                     text="Delete"
                     startIcon={<DeleteIcon />}
                     onClick={() => deleteDocument(recordForView)}
                     fullWidth
                  />
                  <Controls.Button
                     text="Edit"
                     startIcon={<EditIcon />}
                     onClick={() => openInForm(recordForView)}
                     fullWidth
                  />
               </>
            ) : undefined}
         </Stack>
      </Stack>
   );
}
