const multer = require('multer')
const uploadController = require('express').Router()

//destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.filename)
    }
})


const upload = multer({
    storage
})

uploadController.post("/image", upload.single("image"), async(req, res) => {
    try {
        return res.status(200).json("File uploaded succesfully")
    } catch (error) {
        console.error(error)
    }
})

module.exports = uploadController