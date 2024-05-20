import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme ({
    palette: {
        primary: {
            mode: 'light',
            main: '#5e35b1',
            light: '#8261c3',
            dark: '#462885',
            contrastText: '#fff',
        },
        secondary: {
            main: '#64ffda',
            light: '#83ffe1',
            dark: '#46b298',
            contrastText: '#fff',
        },
        error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
            contrastText: '#0e0e0e',
        },
        warning: {
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#bb7a1e',
            contrastText: '#0e0e0e',
        }

    }
})
