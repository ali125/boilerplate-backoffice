import React, { PropsWithChildren } from "react";
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from "@/config/muiConfig";
  
const MUIProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider theme={muiTheme}>
            {children}
        </ThemeProvider>
    );
}

export default MUIProvider;
