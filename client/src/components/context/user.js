import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let cookie = Cookies.get('user')
        if (cookie) {
            fetch(`user/${cookie}`)
                .then((r) => {
                    if (r.ok) {
                        r.json().then((user) => setUser(user));
                    } else {
                        r.json().then((err) => console.log(err));
                        window.alert("Invalid username or password")
                    }
                });
        } else {
            console.log("No user logged in.")
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>);
}

export { UserContext, UserProvider };