export default (req, res) => {
    let app = JSON.parse(req.body.app)
    if (!app) {
        res.send(global.listStatus.notSuccess("app is undefined"))
        return null
    }
    try {
        const application = new global.db.models.Application({
            customer: {
                name: app.customer.name,
                phone: app.customer.phone
            },
            address: app.address,
            queue: app.queue,
            costs: {
                workCost: app.costs.workCost,
                materialCost: app.costs.materialCost
            },
            description: app.description,
            status: "На рассмотрении"
        })
        application.save(((err, doc) => {
            if (err)
                throw err
            res.send(global.listStatus.success(doc))
        }))
    }
    catch (e) {
        res.send(global.listStatus.notSuccess(e))
    }


}
