import router from "router"
import test from "./test/index.js"
import costs from "./costs/index.js"
import application from "./application/index.js"


const appRouter = router()


//localhost:5000/api
appRouter.use('/test', test)
appRouter.use('/costs', costs)
appRouter.use('/application', application)


export default appRouter
