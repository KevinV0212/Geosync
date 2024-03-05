import React from "react";

import {
   ListItemButton as MuiListItemButton,
   ListItemText,
   useTheme,
   ListItemIcon,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export default function ListItemButton(props) {
   const { text, onClick } = props;

   const theme = useTheme();

   return (
      <MuiListItemButton
         onClick={onClick}
         sx={{
            boxSizing: "border-box",
            borderRadius: 1,

            "&:hover": {
               bgcolor: `${theme.palette.primary.darkTrans}!important`,
            },
         }}
      >
         <ListItemIcon sx={{ color: theme.palette.secondary.main }}>
            <DescriptionIcon />
         </ListItemIcon>
         <ListItemText
            align="left"
            primary={text}
            primaryTypographyProps={{
               color: "secondary",
               fontWeight: "medium",
               variant: "body2",
               textTransform: "uppercase",
               style: {
                  wordWrap: "break-word",
               },
            }}
         />
      </MuiListItemButton>
   );
}
