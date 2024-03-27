import { useTheme } from "@emotion/react";
import {
   Box,
   Card,
   CardContent,
   Paper,
   Stack,
   Typography,
} from "@mui/material";
import React from "react";

export default function Section(props) {
   const theme = useTheme();
   const { title, padding, contentCard, children, ...other } = props;

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
                  padding: padding || 0 ? padding : 0,
                  display: "flex",
                  flexWrap: "noWrap",
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

                        display: "flex",
                        flexDirection: "column",

                        overflow: "hidden",
                        overflowY: "auto",
                     }}
                  >
                     <CardContent id="sectionContent" sx={{ flexGrow: 1 }}>
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
