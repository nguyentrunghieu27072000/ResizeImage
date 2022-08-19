import { Router } from "express";

const path_image = process.env.ENVIRONMENT;
const router = Router()

router.get('/results', (req, res) => {
    let urlName = req.session.user
    res.render('results', { urlName })
})
// save to disk
router.route('/download').get((req, res) => {
    let nameImage = req.session.user
    const file = path_image + nameImage;
    res.download(file); // Set disposition and send it.
})

export {router as routerResult}