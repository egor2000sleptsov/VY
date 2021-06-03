import router from "router";
import handler from "./handler/index.js";
const appRouter = router()


// localhost:5000/api/application
appRouter.use('/', handler)
export default appRouter
