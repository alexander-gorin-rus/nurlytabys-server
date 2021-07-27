const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const MainPageVideo = require('../../models/MainPageVideo');
const slugify = require('slugify')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadsMainPageInfo/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4') {
            return cb(res.status(400).end('Не правильный тип файла, разрешены только файлы с разрешением мр4'), false)
        }
        cb(null, true)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

exports.MainPageUploadVideo = async (req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({success: false})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
}

exports.MainPageThumbnail = (req, res) => {

    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration
    })


    ffmpeg(req.body.filePath)
        .on('filenames', function(filenames) {
            console.log('Will generate ' + filenames.join(', '));
            thumbsFilePath = "uploadsMainPageInfo/thumbnails/" + filenames[0];
        })
        .on('end', function() {
            console.log('Screenshots taken');
            return res.json({
                success: true, 
                thumbsFilePath: thumbsFilePath, 
                fileDuration: fileDuration
            })
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploadsMainPageInfo/thumbnails/',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
}

exports.MainPageSaveVideo = async (req, res) => {

    try {
        req.body.slug = slugify(req.body.title);
        const newVideo = await new MainPageVideo(req.body).save();
        res.json({
            success: true,
            newVideo});
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при создании видео' 
            }]});
    }
}

exports.MainPageGetVideo = async (req, res) => {
    const video = await MainPageVideo.find()
    try {
        if(!video){
            return res.status(404).json({errors: [{msg: 'Видео не найдено'}]})
        }
        res.status(200).json({
            length: video.length,
            success: true, 
            video})
    } catch (error) {
        console.log(error)
    }
}

exports.GetMainPageInfo = async (req, res) => {
    try {
        const info = await MainPageVideo.findById(req.params.id);
        res.json({
            success: true,
            info
        })
    } catch (err) {
        res.status(400).json({error: err})
    }
}

exports.MainPageDeleteVideo = async (req, res) => {
    try {
        const video = await MainPageVideo.findOneAndDelete({ slug: req.params.slug });
        if(!video){
            return res.status(404).json({errors: [{msg: `Не могу удалить информацию для главной страницы`}]})
        }else{
            res.status(200).json({msg: 'Информация для главной страницы успешно удалена'})
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ errors: [{msg: 'Не удалось удалить видео главной страницы'}]})
    }
}


exports.MainPageUpdateVideo = async (req, res) => {
    try {
        const video = await MainPageVideo.findByIdAndUpdate(req.params.id, req.body, {new: true} );
        res.json(video)
    } catch (err) {
        console.log(err);
    }
}