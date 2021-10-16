const Employee = require('../../models/Employee');
const Role = require('../../models/Role');

exports.CreateRole = async (req, res) => {
    try {
        const role = await new Role(req.body)
            .save();
            res.json({
                success: true,
                role
            })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при создании роли' 
        }]});
    }
}

exports.GetAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({})
        .populate('employee')
        res.json({
            success: true,
            roles
        })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Роли пока не созданы' 
        }]});
    }
}

exports.GetRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id)
        const employee = await Employee.find({ role })
            .populate('role')
            .exec();
        res.json({
            role,
            employee
        });
    } catch (err) {
        console.log(err);
    }
}

exports.UpdateRole = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedRole)
    } catch (err) {
            return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Не удалось изменить роль' 
        }]});
    }
}

exports.DeleteRole = async (req, res) => {
    try {
        await Role.findByIdAndDelete(req.params.id);
        res.json({
            success: true
        })
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Не удалось удалить роль' 
        }]});
    }
}