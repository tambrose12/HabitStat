import NavButton from './NavButton'
import Login from './Login'
import NavBar from './NavBar'
import UserDash from './UserDash'

export const Root = ({ onLogout, user }) => {
    if (user) {
        return (
            <>
                {/* <NavBar onLogout={onLogout} /> */}

                <UserDash />
            </>
        )
    } else {
        return <Login />;
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