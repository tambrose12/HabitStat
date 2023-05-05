import NavButton from './NavButton'
import Login from './Login'
import NavBar from './NavBar'
import UserDash from './UserDash'
import SignUp from './SignUp'

export const Root = ({ onLogout, user, removeStat }) => {
    if (!user) {
        return (
            <>
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
        <>
            <NavButton />
            <br />
            <h1>404 Not Found</h1>
        </>
    )

}