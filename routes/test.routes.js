const {Router} = require("express")
const router = Router()
const Application = require("../models/Application")


// /api/test/post
router.post('/post', async (req, res) => {
    try {
        const {number, desc} = req.body;
        console.log(req.body)
        const application = new Application({number: number, desc: desc})
        await application.save()
        res.status(201).json({message: "Заявка создана"})
    } catch (e) {
        res.status(500).json({message: "Что то пошло не так"})
    }

})

module.exports = router