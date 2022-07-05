import NewMap from "./NewMap";
import TabSidebar from '../src/TabSidebar'
import ClickedVisContext from "./contexts/ClickedVisProvider";
import DataContext from "./contexts/DataProvider";


export default function Layout() {

    return (
        <DataContext>
            <ClickedVisContext>
                <div className="section">
                    <TabSidebar />
                    {/* <SelectedPanel /> */}
                    <NewMap />
                </div>
            </ClickedVisContext>
        </DataContext>
    )
}