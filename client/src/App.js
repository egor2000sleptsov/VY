import "materialize-css"
import {BrowserRouter as Router} from "react-router-dom";
import {useRoutes} from "./routes"

function App() {
    const routes = useRoutes(true)
    return (
        <div className="container">
            <Router>
                {routes}
            </Router>
        </div>
    )
}

export default App
