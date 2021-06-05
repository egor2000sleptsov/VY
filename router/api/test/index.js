const handler = (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept")
    res.setHeader("Access-Control-Allow-Origin", "*")
    const {query} = req.body
    console.log(req.body)
    if (!query)
        res.send(global.listStatus.notSuccess({query: query}))
    else {
        let test = new global.db.models.Test({
            first: query,
            second: 2
        })
        test.save(((err, doc) => {
            if (err)
                throw err
        }))
        res.send({
            status: "OK"
        })
    }
}

export default handler
