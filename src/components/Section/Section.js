import React from "react";
import styles from "./Section.module.css";
import {
   Box,
   Card,
   CardContent,
   Paper,
   Stack,
   Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

export default function Section(props) {
   const theme = useTheme();
   const { title = null, children, ...other } = props;

   return (
      <Paper
         id="sectionWrapper"
         sx={{ bgcolor: "theme.palette.lightGray.main" }}
         {...other}
      >
         <Stack
            direction="column"
            spacing={2}
            sx={{
               boxSizing: "border-box",

               height: "100%",
               width: "100%",
               padding: 2,

               display: "flex",
               flexDirection: "column",
               alignItems: "stretch",
            }}
         >
            <Box
               id="sectionTitle"
               sx={{
                  boxSizing: "border-box",
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
               id="sectionContentWrapper"
               sx={{
                  flexBasis: 0,
                  flexGrow: 1,
                  overflow: "hidden",
                  overflowY: "scroll",
               }}
            >
               <CardContent id="sectionContent" sx={{}}>
                  {children}
               </CardContent>
            </Card>
         </Stack>
      </Paper>
   );
}
