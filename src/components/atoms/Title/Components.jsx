
import { createTheme, ThemeProvider, Typography } from "@mui/material";


const theme = createTheme({
    typography:{
        footerTitle:{
            fontSize: '1.5rem',
            color: '#0F172A',
            fontWeight: 500,
        },
        profileTitle:{
            fontSize: '1.5rem',
            color: 'black',
            fontWeight: 400,
        },
        h2:{
            fontSize: '3rem',
            color: 'black',
            fontWeight:700,
        },
    },
});

const Components = ({variant, value})=> {
    return(
        <ThemeProvider theme={theme}>
            <Typography variant={variant}>{value}</Typography>
        </ThemeProvider>
    )
}

export default Components