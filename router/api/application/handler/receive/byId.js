export default (req, res) => {
    const ObjectId = global.db.mongoose.Types.ObjectId
    const {id} = req.body
    console.log(req.body)
    if (!global.db.mongoose.Types.ObjectId.isValid(id)) {
        res.send(global.listStatus.notSuccess("invalid ID"))
        return null
    }
    global.db.models.Application.findOne({_id: ObjectId(id)}, (err, doc) => {
        if (err)
            throw err
        if (!doc) {
            res.send(global.listStatus.notExist(id))
            return null
        }

        res.send(global.listStatus.success(doc))
        return null
    })
}
