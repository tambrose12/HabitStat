import NavButton from './NavButton'
import Login from './Login'
import UserDash from './UserDash'
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


export const Root = ({ user, removeStat }) => {
    if (!user) {
        return (
            <>
                <AppBar position="static">
                    <Toolbar color="primary" sx={{ display: "flex", flexDirection: "row", justifyContent: "content-distribution" }}>

                        <div id="header">
                            <h1> HabitStat </h1><TrendingUpIcon fontSize='large' />
                        </div>

                    </Toolbar>
                </AppBar>
                <Login />

            </>
        )
    }
    else if (user) {
        return (
            <>
                <UserDash removeStat={removeStat} />
            </>
        )
    }

}

export const NotFound = () => {
    return (
        <div className='Login' >
            <NavButton text='Back to Site' path="/" />
            <br />
            <h1>404: Page Not Found</h1>
        </div>
    )

}