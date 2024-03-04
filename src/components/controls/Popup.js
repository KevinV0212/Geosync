import React from "react";
import Controls from "./Controls";
import {
   Box,
   Dialog,
   DialogContent,
   DialogTitle,
   Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
   const { title, children, openPopup, setOpenPopup } = props;
   return (
      <Dialog open={openPopup} fullWidth={true} maxWidth="md">
         <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  {title}
               </Typography>
               <Controls.IconButton onClick={() => setOpenPopup(false)}>
                  <CloseIcon />
               </Controls.IconButton>
            </Box>
         </DialogTitle>
         <DialogContent dividers>{children}</DialogContent>
      </Dialog>
   );
}
