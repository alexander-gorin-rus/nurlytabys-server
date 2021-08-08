const Business = require('../../models/Business');

exports.CreateBusiness = async (req, res) => {
    try {
        const business = await new Business(req.body)
            .save();
            res.json({
                success: true,
                business
            });
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при создании дела' 
            }]});
        }
    }

exports.GetAllBusinesses = async (req, res) => {
    try {
        const list = await Business.find();
        res.json({
            success: true,
            list
        })
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при отображении списка дел' 
            }]});
        }
    }

exports.GetBusinessById = async (req, res) => {
    try {
        const business = await Business.findById(req.params.id);
        res.json({
            success: true,
            business
        })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при отображении дела по идентификатору' 
            }]});
        }
    }

exports.UpdateBusiness = async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            success: true,
            business
        })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при внесении изменений в дело' 
            }]});
        }
    }

exports.DeleteBusiness = async (req, res) => {
    try {
        await Business.findByIdAndDelete(req.params.id);
        res.json({
            success: true
        })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при удалении дела' 
            }]});
        }
    }