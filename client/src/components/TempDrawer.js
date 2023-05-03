import * as React from 'react';
import { useContext } from 'react'
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
import Cookies from 'js-cookie';

export default function TempDrawer() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    // let removing = browser.cookies.remove(
    //     {}
    //   )

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => {
            setUser(null)
            document.cookie.remove('session')
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
                {/* {['Profile', 'User Dashboard', 'Select New Habits', 'See Habit Stats'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))} */}
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary='Profile' />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/userdash')}>
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
            </List>
        </Box>
    );

    return (
        <div>
            {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
            <React.Fragment key='left'>
                <Button onClick={toggleDrawer('left', true)} variant='outlined' sx={{ marginTop: 1.5 }}>MENU</Button>
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