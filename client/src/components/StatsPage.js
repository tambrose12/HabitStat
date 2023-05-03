import Charts from "./Charts";
import UserDataGrid from "./UserDataGrid";
import TempDrawer from "./TempDrawer";

const StatsPage = ({ setStats }) => {


    return (
        <div>
            <TempDrawer />
            <br />
            <UserDataGrid setStats={setStats} />
            <Charts />
        </div>
    )

}

export default StatsPage