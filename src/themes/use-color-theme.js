import { createTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "./Theme";

export const useColorTheme = () => {
   const [mode, setmode] = useState("dark");

   const toggleColorMode = () => {
      setmode((prevMode) => (prevMode === "light" ? "dark" : "light"));
   };

   const modifiedTheme = useMemo(
      () => createTheme(getDesignTokens(mode)),
      [mode]
   );

   return {
      theme: modifiedTheme,
      mode,
      toggleColorMode,
   };
};
