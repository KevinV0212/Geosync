import React from "react";
import styles from "./Section.module.css";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
export default function Section(props) {
   const { title = null, children } = props;
   const theme = useTheme();

   return (
      <Paper
         id="sectionWrapper"
         sx={{
            padding: 2,
            bgcolor: theme.palette.lightGray.main,

            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
         }}
      >
         <Box
            id="sectionContent"
            sx={{
               flexGrow: 1,
               display: "flex",
               flexDirection: "column",
               justifyContent: "flex-start",
               alignItems: "stretch",
               gap: 2,
            }}
         >
            <Box
               id="sectionTitle"
               sx={{
                  padding: 1,
                  bgcolor: "black",
                  borderRadius: 1,
               }}
            >
               <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  color="common.white"
               >
                  {title || ""}
               </Typography>
            </Box>
            <Card
               id="sectionContent"
               sx={{
                  maxHeight: "80%",
                  flexGrow: 1,
                  overflow: "hidden",
                  overflowY: "scroll",
               }}
            >
               {children}
            </Card>
         </Box>
      </Paper>
   );
}
