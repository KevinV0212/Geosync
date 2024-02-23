import React, { useEffect, useState } from "react";
import Controls from "../controls/Controls";
import { Divider, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delete } from "@mui/icons-material";

const initialInfo = {
   id: "",
   link: "",
   title: "",
   description: "",
   docType: "",
};

export default function DocumentInfo(props) {
   const [info, setInfo] = useState(initialInfo);
   const { recordForView, openInForm, deleteDocument } = props;
   //title (in popup title)
   // description
   // link
   // buttons
   // edit, delete

   useEffect(() => {
      if (recordForView != null) {
         setInfo({ ...recordForView });
      }
   }, [recordForView]);

   return (
      <div>
         <Typography align="left" width={1} paragraph={true}>
            {info.description}
         </Typography>
         <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography align="left" width={1} noWrap={true}>
               {info.link}
            </Typography>
            <Controls.IconButton>
               <ContentCopyIcon />
            </Controls.IconButton>
            <a href={info.link} target="_blank">
               <Controls.IconButton h>
                  <OpenInNewIcon />
               </Controls.IconButton>
            </a>
         </Stack>
         <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
         >
            <Controls.Button
               text="Edit"
               startIcon={<EditIcon />}
               onClick={() => openInForm(recordForView)}
            />
            <Controls.Button
               text="Delete"
               startIcon={<Delete />}
               onClick={() => deleteDocument(recordForView)}
            />
         </Stack>
      </div>
   );
}
