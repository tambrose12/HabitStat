import React from "react"
import TempDrawer from "./TempDrawer"



const HabitsList = ({ habitCard }) => {


    return (
        <div >
            <TempDrawer />
            <div className="habitList">
                {habitCard}
            </div>
        </div>
    )

}

export default HabitsList