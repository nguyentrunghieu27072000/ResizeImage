import { Router } from "express";
// resize image
import sharp from 'sharp';
sharp.cache(false)

const path_image = ENVIRONMENT
const router = Router()

router.get('/resize', (req, res) => {
    let nameImage = req.session.user
    if (!nameImage) {
        nameImage = 'image_upload.jpg'
    }
    var sizeOf = require('image-size');
    var dimensions = sizeOf(path_image + nameImage);
    res.render('resize', { nameImageUpload: nameImage, dimensions: dimensions })
})

router.post('/complete', (req, res) => {
    if (req.body.submit) {
        let height = Number(req.body.height)
        let width = Number(req.body.width)
        let image = req.body.submit
        let name_new = Date.now() + '.jpg'
        sharp(`${path_image + image}`).resize(width, height).toFile(`${path_image + name_new}`).then(() => {
            req.session.user = name_new
            res.redirect(`/results`)
        })
    }
})

// xu ly rotate
async function sharpRotate(path: string, val: number) {
    let buffer = await sharp(path).rotate(val).toBuffer()
    const result = await sharp(buffer).toFile(path);
    return result;
}
// xu ly flip
async function sharpFlip(path: string, val: boolean) {
    let buffer = await sharp(path).flip(val).toBuffer();
    const result = await sharp(buffer).toFile(path);
    return result;
}
// xu ly flop
async function sharpFlop(path: string, val: boolean) {
    let buffer = await sharp(path).flop(val).toBuffer();
    const result = await sharp(buffer).toFile(path);
    return result;
}

router.post('/crop', (req, res) => {
    let name_new = Date.now() + '.jpg'
    let src_image = req.session.user
    let data = req.body
    let arr_out = {};
    let path = path_image + src_image
    switch (data.action.trim()) {
        case 'ROTATE':
            sharpRotate(path, Number(data.value)).then((info) => {
                arr_out = {
                    msg: 'success',
                    info: info,
                    image: `images/${src_image}?${Date.now()}`,
                }
                res.json(arr_out)
            });
            break
        case 'FLOP':
            sharpFlop(path, data.value).then((info) => {
                arr_out = {
                    msg: 'success',
                    info: info,
                    image: `images/${src_image}?${Date.now()}`,
                }
                res.json(arr_out)
            });
            break
        case 'FLIP':
            sharpFlip(path, data.value).then((info) => {
                arr_out = {
                    msg: 'success',
                    info: info,
                    image: `images/${src_image}?${Date.now()}`,
                }
                res.json(arr_out)
            });
            break
        default: break
    }
})

export { router as routerResize }