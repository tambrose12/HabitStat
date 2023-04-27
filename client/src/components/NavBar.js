import React, { useContext } from "react"
import { UserContext } from "./context/user";

function NavBar({ onLogout }) {
    const { user, setUser } = useContext(UserContext)

    function handleLogout() {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => onLogout());
    }

    const renderHeader = () => {
        if (!user) {
            return <h3>Habitstat</h3>
        } else {
            return (
                <>
                    <h3>{user.username}'s Habitstat</h3>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )
        }
    }

    // console.log(user.username)

    return (
        <header>
            <button onClick={handleLogout}>Logout</button>
            <h3>{renderHeader}</h3>
        </header>
    );
}

export default NavBar;