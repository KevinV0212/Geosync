import React from "react";
import styles from "./Section.module.css";
import { Box, Card, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { AddBox } from "@mui/icons-material";
export default function Section(props) {
   const { title = null, children } = props;
   const theme = useTheme();

   return (
      <Paper
         id="sectionWrapper"
         sx={{
            maxHeight: "60%",
            padding: 2,
            bgcolor: theme.palette.lightGray.main,
         }}
         className={`${styles.flexColumn} + ${styles.flexGrow}`}
      >
         <Stack spacing={2} className={styles.flexColumn}>
            <Box
               id="sectionTitle"
               sx={{
                  padding: 1,
                  bgcolor: "black",
                  borderRadius: 1,
               }}
               className={styles.flexGrow}
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
                  overflow: "hidden",
                  overflowY: "scroll",
               }}
               className={`${styles.flexColumn} + ${styles.flexGrow}`}
            >
               {children}
            </Card>
         </Stack>
      </Paper>
   );
}
