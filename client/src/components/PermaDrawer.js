// import * as React from 'react';
// import { useContext } from 'react'
// import { UserContext } from "./context/user";
// import { useNavigate } from "react-router-dom";
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
// import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
// import LogoutIcon from '@mui/icons-material/Logout';
// import UserDash from './UserDash';

// const drawerWidth = 240;

// export default function ClippedDrawer({ removeStat }) {

//     const navigate = useNavigate()
//     const { user, setUser } = useContext(UserContext)


//     function handleLogout() {
//         fetch("/logout", {
//             method: "DELETE",
//         }).then(() => {
//             setUser(null)
//         });

//     }


//     return (
//         <Box sx={{ display: 'flex' }}>
//             <CssBaseline />
//             <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//                 <Toolbar>
//                     <Typography variant="h6" noWrap component="div">
//                         HabitStat
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//                 }}
//             >
//                 <Toolbar />
//                 <Box sx={{ overflow: 'auto' }}>
//                     <List>
//                         <ListItem disablePadding>
//                             <ListItemButton onClick={() => navigate('/profile')}>
//                                 <ListItemIcon>
//                                     <AccountCircleIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary='Profile' />
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem disablePadding>
//                             <ListItemButton onClick={() => navigate('/userdash')}>
//                                 <ListItemIcon>
//                                     <SpaceDashboardIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary='Dashboard' />
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem disablePadding>
//                             <ListItemButton onClick={() => navigate('/userstats')}>
//                                 <ListItemIcon>
//                                     <AssessmentIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary='See Habit Stats' />
//                             </ListItemButton>
//                         </ListItem>
//                         <ListItem disablePadding>
//                             <ListItemButton onClick={() => navigate('/habits')}>
//                                 <ListItemIcon>
//                                     <PlaylistAddIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary='Select New Habits' />
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                     <Divider />
//                     <List>
//                         <ListItem disablePadding>
//                             <ListItemButton onClick={handleLogout}>
//                                 <ListItemIcon>
//                                     <LogoutIcon />
//                                 </ListItemIcon>
//                                 <ListItemText primary='Log Out' />
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </Box>
//             </Drawer>
//             <UserDash removeStat={removeStat} />
//             {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <Toolbar />
//                 <UserDash removeStat={removeStat} />
//             </Box> */}
//         </Box>
//     );
// }