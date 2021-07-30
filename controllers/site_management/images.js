const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadsImages/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.jpg' || ext!== '.png' || ext !== 'jpeg' ) {
            return cb(res.status(400).end('Не правильный тип файла, разрешены только файлы с разрешением .png, .jpeg, .png'), false)
        }
        cb(null, true)
    }
  });
   
var upload = multer({ storage: storage }).single("file")

exports.UploadImages = (req, res) => {
    upload(req, res, err => {
        if(err) return res.json({success: false})
        return res.json({success: true, image: res.req.file.path, fileName: res.req.file.filename})
    })
}