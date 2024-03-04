import React from "react";
import styles from "./Section.module.css";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { AddBox } from "@mui/icons-material";
export default function Section(props) {
   const { title = null, children, ...other } = props;
   const theme = useTheme();

   return (
      <Paper
         id="sectionWrapper"
         sx={{
            padding: 2,
            bgcolor: theme.palette.lightGray.main,
         }}
         {...other}
      >
         <Stack spacing={2} className={styles.flexColumn}>
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
                  flexGrow: 1,

                  overflow: "hidden",
                  overflowY: "scroll",
               }}
            >
               {children}
            </Card>
         </Stack>
      </Paper>
   );
}
