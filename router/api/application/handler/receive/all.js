export default (req, res) => {
    global.db.models.Application.find({}, (err, docs) => {
        if (err)
            throw err
        if (!docs.length){
            res.send(global.listStatus.notExist())
            return null
        }

        res.send(global.listStatus.success(docs))
    })
}
