import all from "./all.js";
import byId from "./byId.js";

export default (req, res) => {
    const {body} = req

    if (body.submethod === "all"){
        all(req, res)
        return null
    }
    if (body.submethod === "byId"){
        byId(req, res)
        return null
    }

    res.send(global.listStatus.invalidSubmethod(body.submethod))
}



