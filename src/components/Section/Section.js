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
   const {
      title = null,
      padding = 0,
      contentCard = false,
      children,
      ...other
   } = props;

   return (
      <Box {...other}>
         <Paper
            id="sectionWrapper"
            sx={{
               height: "100%",
               width: "100%",
               bgcolor: theme.palette.lightGray.main,
            }}
         >
            <Stack
               direction="column"
               spacing={2}
               sx={{
                  boxSizing: "border-box",
                  height: "100%",
                  width: "100%",
                  padding: padding,

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
               }}
            >
               {title ? (
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
               ) : undefined}

               {contentCard ? (
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
               ) : (
                  children
               )}
            </Stack>
         </Paper>
      </Box>
   );
}
