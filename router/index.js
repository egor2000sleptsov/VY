import router from "router"
import api from './api/index.js'

const appRouter = router()

appRouter.use('/api', api)

export default appRouter
