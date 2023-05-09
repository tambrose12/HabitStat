import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/user";
import TempDrawer from "./TempDrawer"
import AddNewHabit from "./AddNewHabit";



const HabitsList = ({ habitCard, addHabitToState }) => {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            fetch("/check_session")
                .then((response) => {
                    if (response.ok) {
                        response.json().then((user) => setUser(user))
                    }
                })
        }
    }, [])

    const renderImage = user ? <img className="userImage2" src={user.image} alt={user.username} /> : ""

    return (
        <div >
            <TempDrawer />

            <div className="habitListImgDiv">
                {renderImage}
            </div>
            <h3 className="habitsHeader">Suggested Habits</h3>
            <div className="habitList">

                {habitCard}
            </div>
            <AddNewHabit addHabitToState={addHabitToState} />
        </div>
    )

}

export default HabitsList