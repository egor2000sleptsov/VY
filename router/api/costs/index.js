import router from "router";
import get from "./get/index.js"

const appRouter = router()


// localhost:5000/api/costs/get
appRouter.use("/get", get)

export default appRouter
