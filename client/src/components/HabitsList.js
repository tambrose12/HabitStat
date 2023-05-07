import React, { useContext, useState } from "react";
import { UserContext } from "./context/user";
import TempDrawer from "./TempDrawer"



const HabitsList = ({ habitCard }) => {
    const { user } = useContext(UserContext)

    return (
        <div >
            <TempDrawer />

            <div className="habitListImgDiv">
                <img className="userImage2" src={user.image} alt={user.username} />
            </div>
            <div className="habitList">

                {habitCard}
            </div>
        </div>
    )

}

export default HabitsList