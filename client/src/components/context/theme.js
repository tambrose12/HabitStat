import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function DarkThemeProvider({ children }) {

    const lightTheme = createTheme({
        palette: {
            mode: 'light'
        }
    })

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const [mode, setMode] = useState(lightTheme)

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === lightTheme ? darkTheme : lightTheme));
            },

        }),
        [],
    );


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={mode}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


export { ColorModeContext, DarkThemeProvider };