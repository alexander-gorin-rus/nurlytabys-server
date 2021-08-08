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
  // try {
  //   const employees = await Employee.find()
  //   res.json({
  //     list: employees
  //   })
  // } catch (err) {
  //   res.status(404).json({
  //     errors: [{msg: "Список сотрудников пуст"}]
  //   })
  // }

  // const employees = await Employee.find({})
  //       .populate('role')
  //   try {
  //       if(!employees){
  //           return res.status(404).json({errors: [{msg: 'Список сотрудников пуст'}]})
  //       }
  //       res.json({
  //         list: employees
  //       })
  //   } catch (error) {
  //       console.log(error)
  //   }

  try {
    const employees = await Employee.find({})
      .populate('role')
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
  // const employee = await Employee.findById(req.params.id)
  //       .populate('role')
  //   try {
  //       if(!employee){
  //           return res.status(404).json({errors: [{msg: 'Такой сотрудник не найден'}]})
  //       }
  //       res.status(200).json({success: true, employee})
  //   } catch (error) {
  //       console.log(error)
  //   }
  try {
      const employee = await Employee.findById(req.params.id)
      .populate('role')
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

exports.UpdateEmployee = async (req, res) => {
  try {
    const updated_employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true} );
    res.json(updated_employee)
} catch (err) {
    console.log(err)
}
}

exports.DeleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id)
    res.json({
      success: true
    })
  } catch (err) {
    console.log(err)
  }
}