const Category = require('../../models/Category');
const slugify = require('slugify');
const Video = require('../../models/Video');

exports.CategoryCreate = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category({ name, description, slug: slugify(name) }).save()
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
        //res.status(200).json(category)
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

    // const category = await Category.findOne({ slug: req.params.slug })
    //     .exec();
    //     res.json(category)
    //res.json({data:category});
    
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