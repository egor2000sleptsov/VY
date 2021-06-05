import receive from "./receive/index.js"
import send from './send/index.js'
const handler = (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept")
    res.setHeader("Access-Control-Allow-Origin", "*")
    const {body} = req

    if (body.method ==='receive'){
        receive(req, res)
        return null
    }

    if (body.method === "send"){
        send(req, res)
        return null
    }

    res.send(global.listStatus.invalidMethod())
}

export default handler
