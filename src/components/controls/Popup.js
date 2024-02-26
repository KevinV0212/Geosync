import React from "react";
import Controls from "./Controls";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
   const { title, children, openPopup, setOpenPopup } = props;
   return (
      <Dialog open={openPopup} fullWidth={true} maxWidth="sm">
         <DialogTitle>
            <div style={{ display: "flex", alignItems: "center" }}>
               <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                  {title}
               </Typography>
               <Controls.IconButton onClick={() => setOpenPopup(false)}>
                  <CloseIcon />
               </Controls.IconButton>
            </div>
         </DialogTitle>
         <DialogContent dividers>{children}</DialogContent>
      </Dialog>
   );
}
