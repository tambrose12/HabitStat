import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);


    // useEffect(() => {
    //     console.log("useEffect fires but fetch is async")
    //     fetch("/check_session").then((response) => {
    //         if (response.ok) {
    //             console.log(response.ok)
    //             response.json().then((user) => setUser(user))
    //                 ;
    //         }
    //     });

    // }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>);
}

export { UserContext, UserProvider };


    // useEffect(() => {
    //     let cookie = Cookies.get('user')
    //     if (cookie) {
    //         fetch(`user/${cookie}`)
    //             .then((r) => {
    //                 if (r.ok) {
    //                     r.json().then((user) => setUser(user));
    //                 } else {
    //                     r.json().then((err) => console.log(err));
    //                     window.alert("Invalid username or password")
    //                 }
    //             })
    //             .catch(err => console.log(err))
    //     } else {
    //         console.log("No user logged in.")
    //     }
    // }, [])