import {
   ListItemButton as MuiListItemButton,
   ListItemText,
   useTheme,
} from "@mui/material";
import React from "react";

export default function ListItemButton(props) {
   const { text, onClick } = props;

   const theme = useTheme();

   return (
      <MuiListItemButton
         onClick={onClick}
         sx={{
            borderRadius: 1,

            "&:hover": {
               bgcolor: theme.palette.primary.darkTrans,
            },
         }}
      >
         <ListItemText
            align="left"
            primary={text}
            primaryTypographyProps={{
               color: "primary",
               fontWeight: "medium",
               variant: "body2",
               textTransform: "uppercase",
            }}
         />
      </MuiListItemButton>
   );
}
