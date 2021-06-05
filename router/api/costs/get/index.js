const handler = (req, res) => {
    global.db.models.Test.find({}, ((err, docs) => {
        res.send(docs)
    }))
}

export default handler
