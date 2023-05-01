import React from "react"
import TempDrawer from "./TempDrawer"



const HabitsList = ({ habitCard }) => {


    return (
        <div>
            <TempDrawer />
            {habitCard}
        </div>
    )

}

export default HabitsList