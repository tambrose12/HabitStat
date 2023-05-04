import React, { useEffect, useState } from "react";

const StatsContext = React.createContext();

function StatsProvider({ children }) {
    const [stats, setStats] = useState([])

    useEffect(() => {
        fetch("/stats")
            .then((response) => {
                if (response.ok) {
                    response.json().then((stats) => setStats(stats));
                }
            })
    }, [])


    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            {children}
        </StatsContext.Provider>);
}

export { StatsContext, StatsProvider };