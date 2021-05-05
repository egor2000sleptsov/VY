import "materialize-css"
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes"
import Navbar from "./components/Navbar";

function App() {
    const routes = useRoutes(true)
    return (
        <div>
            <Router>
                <Navbar/>
                {routes}
            </Router>
        </div>
    )
}

export default App
