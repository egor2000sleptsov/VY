import receive from "./receive/index.js"

const handler = (req, res) => {
    const {body} = req

    if (body.method ==='receive'){
        receive(req, res)
        return null
    }

    res.send(global.listStatus.invalidMethod())
}

export default handler
