import { Router } from "express";
import * as fs from 'fs';

const path_image = ENVIRONMENT
const router = Router()

//khoi dong  upload file
import multer from "multer"
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './public/images')
  },
  filename: function (req: any, file: any, cb: any) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => res.render('index'));

router.post('/upload', upload.single('fileimage'), (req, res, next) => {
  let file_upload = (req as any).file
  let file_name_new = file_upload.filename + '.jpg'
  fs.rename(file_upload.path, path_image + file_name_new, (err) => {
    console.log(err)
  })
  req.session.user = file_name_new
  res.redirect(`/resize`)
})

export { router as routerUpload }