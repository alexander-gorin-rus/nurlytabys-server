const EmployeeBusiness = require('../../models/EmployeeBusiness');
const Employee = require('../../models/Employee');

exports.CreateEmployeeBusiness = async (req, res) => {
    try {
        const business = await new EmployeeBusiness(req.body.values)
            .save();
            res.send(business)
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .json({ errors: [{ 
                msg: 'Ошибка при создании дела' 
            }]});
        }
    }

exports.GetEmployeeBusiness = async (req, res) => {
    try {
        const employee = await Employee()
    } catch (err) {
        console.log(err)
    }
}