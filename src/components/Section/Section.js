import React from "react";
import styles from "./Section.module.css";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
export default function Section(props) {
   const { title = null, children } = props;
   const theme = useTheme();

   return (
      <Paper
         sx={{
            padding: 2,
            bgcolor: theme.palette.lightGray.main,

            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: 1,
         }}
      >
         <Box
            sx={{
               padding: 1,
               bgcolor: "black",
               borderRadius: 1,
            }}
         >
            <Typography
               variant="h"
               component="h2"
               align="center"
               color="common.white"
            >
               {title || ""}
            </Typography>
         </Box>
         <Card sx={{ flexGrow: 1 }}>{children}</Card>
      </Paper>
   );
}
