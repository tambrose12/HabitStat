import React, { useEffect, useState } from "react";

const StatsContext = React.createContext();

function StatsProvider({ children }) {
    const [stats, setStats] = useState([])




    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            {children}
        </StatsContext.Provider>);
}

export { StatsContext, StatsProvider };