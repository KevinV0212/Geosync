import React, { useEffect, useState } from "react";
import Controls from "../reusable/Controls";
import { Divider, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialInfo = {
   id: "",
   title: "",
   description: "",
   pmesiiCat: "",
   ascopeCat: "",
};

export default function WikiEntryInfo(props) {
   // Handling form data
   const [info, setInfo] = useState(initialInfo);
   const { recordForView, openInForm, deleteEntry, editable = false } = props;

   function firstCharToCaps(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }
   useEffect(() => {
      if (recordForView != null) {
         setInfo({ ...recordForView });
      }
   }, [recordForView]);

   return (
      <Stack spacing={2}>
         <Typography align="left" width={1} sx={{ fontWeight: "bold" }} noWrap>
            {`${firstCharToCaps(info.pmesiiCat)} / ${firstCharToCaps(info.ascopeCat)}`}
         </Typography>
         <Typography
            align="left"
            width={1}
            paragraph
            sx={{ wordWrap: "break-word" }}
         >
            {info.description}
         </Typography>

         {editable ? (
            <Stack
               direction="row"
               spacing={2}
               alignItems="center"
               justifyContent="center"
               divider={<Divider orientation="vertical" flexItem />}
            >
               <Controls.Button
                  variant="outlined"
                  text="Delete"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteEntry(recordForView)}
                  fullWidth
               />
               <Controls.Button
                  text="Edit"
                  startIcon={<EditIcon />}
                  onClick={() => openInForm(recordForView)}
                  fullWidth
               />
            </Stack>
         ) : undefined}
      </Stack>
   );
}
