const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.authEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.employee.id).select('-password');
        res.json(employee)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.employeeRegister = async (req, res) => {
  
    const { name, lastName, email, phone, password } = req.body;

    try {
      //see if the employee exists
      let employee = await Employee.findOne({ email });
      if (employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Сотрудник с таким email уже зарегистрирован' }] });
      }

      employee = new Employee({
        name,
        lastName,
        phone,
        email,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      employee.password = await bcrypt.hash(password, salt);
      await employee.save();

      //return jsonwebtoken
      const payload = {
        employee: {
          id: employee.id
        }
      };

      jwt.sign(
        payload,
        process.env.JSONWEBTOKEN,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            token,
            messages: [{ msg: 'Вы успешно зарегистрировались' }]  
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

exports.employeeLogin = async (req, res) => {
  const { email, password } = req.body;

    try {
      //see if the user exists
      let employee = await Employee.findOne({ email });
      if (!employee) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Неверные данные' }] });
      }

      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Неверные данные' });
      }

      //return jsonwebtoken
      const payload = {
        employee: {
          id: employee.id
        }
      };

      jwt.sign(
        payload,
        process.env.JSONWEBTOKEN,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

exports.employeeList = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({
      list: employees
    })
  } catch (err) {
    res.status(404).json({
      errors: [{msg: "Список сотрудников пуст"}]
    })
  }
}

exports.GetEmployeeById = async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if(!employee){
          return res.status(404).json({
              errors: [{
                  msg: "Такой сотрудник не найден"
              }]
          })
      }else{
          res.json({
              success: true,
              employee
          })
      }
  } catch (err) {
      return res
          .status(400)
          .json({ errors: [{ 
              msg: 'Ошибка при отображении сотрудника' 
      }]});
  }
}