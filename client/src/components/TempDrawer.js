import * as React from 'react';
import { useContext, useState } from 'react'
import { UserContext } from "./context/user";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from './context/theme';
import CircleIcon from '@mui/icons-material/Circle';

export default function TempDrawer() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const colorMode = useContext(ColorModeContext);


    function handleLogout() {
        navigate("/")
        fetch("/logout", {
            method: "DELETE",
        }).then(() => {
            setUser(null)
        });

    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <SpaceDashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/userstats')}>
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary='See Habit Stats' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/habits')}>
                        <ListItemIcon>
                            <PlaylistAddIcon />
                        </ListItemIcon>
                        <ListItemText primary='Select New Habits' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log Out' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={colorMode.toggleColorMode} color="inherit">
                        <ListItemIcon>
                            <CircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dark/Light Mode' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );





    return (
        <div>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
            <React.Fragment key='left'>
                <AppBar position="static">
                    <Toolbar color="primary" sx={{ display: "flex", flexDirection: "row", justifyContent: "content-distribution" }}>
                        <Button onClick={toggleDrawer('left', true)} variant='contained' bgcolor='background.default' sx={{ marginTop: 1.5, marginRight: 5 }}><MenuIcon /></Button>
                        <br />
                        <div id="header">
                            <h1> HabitStat </h1><TrendingUpIcon fontSize='large' />
                        </div>

                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor='left'
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>

        </div>
    );
}