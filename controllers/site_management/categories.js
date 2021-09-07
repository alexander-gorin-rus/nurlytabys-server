const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const Category = require('../../models/Category');
const slugify = require('slugify');
const Video = require('../../models/Video');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadsCategory/')
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

exports.CategoryUploadVideo = async (req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({success: false})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
}

exports.CategoryThumbnail = (req, res) => {

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
            thumbsFilePath = "uploadsCategory/thumbnails/" + filenames[0];
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
            folder: 'uploadsCategory/thumbnails/',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });
}

exports.CategorySaveVideo = async (req, res) => {

    try {
        
        req.body.slug = slugify(req.body.title);
        const newCategory = await new Category(req.body).save();
        res.json({
            success: true,
            newCategory});
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при создании видео' 
            }]});
    }
}

exports.CategoryCreate = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            filePath, 
            duration, 
            thumbnail,
            images 
        } = req.body;
        const category = await Category({ name, description, filePath, duration, thumbnail, images, slug: slugify(name) }).save()
        res.json(category)
    } catch (err) {
        return res
            .status(500)
            .json({ errors: [{msg: 'Не удалось создать категорию'}] })
    }
}

exports.Categories = async (req, res) => {
    try {
        const categories = await Category.find();
        if(categories.length === 0){
            return res.status(404).json({
                msg: 'Категории не найдены'
            })
        }else{
            res.status(200).json(categories)
        }
    } catch (err) {
        console.log(err)
    }
}

exports.DeleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({slug: req.params.slug});
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
    }
}

exports.UpdateCategory = async (req, res) => {
    try {
        const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true} );
        res.json(updated)
    } catch (err) {
        console.log(err)
    }
}


exports.GetOneCategory = async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug});
        const videos = await Video.find({ category })
            .populate('category')
            .exec();
        res.json({
            category,
            videos
        });
    } catch (err) {
        console.log(err);
    }
}

exports.GetCategoryToUpdate = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).json({
                errors: [{msg: `Категория не найдена ${req.params.id}`}]
            })
        }else{
            res.json({
                success: true,
                category
            })
        }
    } catch (err) {
        
    }
}

exports.Test = async (req, res) => {
    
}