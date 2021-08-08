const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const Video = require('../../models/Video');
const slugify = require('slugify')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
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

exports.UploadVideo = async (req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({success: false})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
}

exports.Thumbnails = (req, res) => {

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
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
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
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
}

exports.SaveVideo = async (req, res) => {

    try {
        
        req.body.slug = slugify(req.body.title);
        const newVideo = await new Video(req.body).save();
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

exports.GetVideos = async (req, res) => {
    const videos = await Video.find()
    try {
        if(!videos){
            return res.status(404).json({errors: [{msg: 'Видео не найдено'}]})
        }
        res.status(200).json({
            length: videos.length,
            success: true, 
            videos})
    } catch (error) {
        
    }
}

exports.UpdateVideo = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(video)
    } catch (err) {
        console.log(err)
    }
}

exports.DeleteVideo = async (req, res) => {
    try {
        const video = await Video.findOneAndDelete({ slug: req.params.slug });
        if(!video){
            return res.status(404).json({errors: [{msg: `Не могу удалить Видео под названием ${slug}, поскольку оно не найдено`}]})
        }else{
            res.status(200).json({msg: 'Видео успешно удалено'})
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ errors: [{msg: 'Не удалось удалить видео'}]})
    }
}

exports.GetVideo = async (req, res) => {
    const video = await Video.findOne({ slug: req.params.slug })
        .populate('category')
    try {
        if(!video){
            return res.status(404).json({errors: [{msg: 'Видео не найдено'}]})
        }
        res.status(200).json({success: true, video})
    } catch (error) {
        
    }
}

exports.GetSingleVideo = async (req, res) => {
    const video = await Video.findById(req.params.id)
        .populate('category')
    try {
        if(!video){
            return res.status(404).json({errors: [{msg: 'Видео не найдено'}]})
        }
        res.status(200).json({success: true, video})
    } catch (error) {
        console.log(error)
    }
}