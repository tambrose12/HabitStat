import Charts from "./Charts";
import UserDataGrid from "./UserDataGrid";
import TempDrawer from "./TempDrawer";
import Modal from "react-modal";

const StatsPage = ({ setStats }) => {


    return (
        <div>
            <TempDrawer />
            <div className="chartDiv">
                <br />
                {/* <UserDataGrid setStats={setStats} /> */}
                <Charts />
            </div>
        </div>
    )

}

export default StatsPage