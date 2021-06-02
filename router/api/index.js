import router from "router"
import test from "./test/index.js"

const appRouter = router()


//localhost:5000/api/test
appRouter.use('/test', test)

export default appRouter
