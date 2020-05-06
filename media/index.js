const express = require('express')
const multer = require('multer')
const path = require('path')
const cors = require('cors')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
        })
    }
})

const upload = multer({ storage: storage })
const app = express()
const PORT = 4000

app.use(cors())
app.use(express.static('uploads/'))

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json({ uuid: req.file.filename})
    }
    else throw 'error'
})

app.listen(PORT, () => {
    console.log('Listening at ' + PORT )
})