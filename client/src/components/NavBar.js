import React, { useContext } from "react"
import { UserContext } from "./context/user";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";


function NavBar({ }) {
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser());
    }


    const mdTheme = createTheme();

    const renderHeader = () => {
        if (!user) {
            return (
                <Toolbar sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Habitstat Dashboard
                    </Typography>

                </Toolbar>
            )
        } else {
            return (
                <>

                    <Toolbar sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {user.username}'s Habitstat Dashboard
                        </Typography>
                        <Button variant='contained' onClick={handleLogout}>Logout</Button>
                    </Toolbar>

                    <h3>{user.username}'s Habitstat</h3>

                </>
            )
        }
    }

    // console.log(user.username)

    return (
        <header>
            <ThemeProvider theme={mdTheme}>

                <Button variant='outlined' onClick={handleLogout}>Logout</Button>
                {renderHeader}

            </ThemeProvider>
        </header>
    );
}

export default NavBar;