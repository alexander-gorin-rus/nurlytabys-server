const Register = require('../models/RegisterPassword');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getEntry = async (req, res) => {
  try {
    const register = await Register.findById(req.register.id).select('-password').select('-name');
    res.json(register);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

exports.registerEntry = async (req, res) => {
    const { name,  password } = req.body;

    try {
      //see if the employee exists
      let register = await Register.findOne({ name });
      if (register) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Пароль с таким названием уже зарегистрирован' }] });
      }

      register = new Register({
        name,
        password
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      register.password = await bcrypt.hash(password, salt);
      await register.save();

      //return jsonwebtoken
      const payload = {
        register: {
          id: register.id
        }
      };

      jwt.sign(
        payload,
        process.env.ENTRYTOKEN,
        { expiresIn: 360000 },
        (err, entry_token) => {
          if (err) throw err;
          res.json({ 
            entry_token,
            messages: [{ msg: 'Пароль успешно зарегистрирован' }]  
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
}

exports.updateRegister = async (req, res) => {
  try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const name = await req.body.name
      const updated = await Register.findByIdAndUpdate(req.params.id, {password: password, name: name}, {new: true} );
      await updated.save();
      res.json(updated)
  } catch (err) {
      console.log(err)
  }
}


exports.confirmEntry = async (req, res) => {
    const { name, password } = req.body;

    try {
        const register = await Register.findOne({ name });
        if(!register){
          return res
            .status(400)
            .json({ errors: [{ msg: 'Неверные данные' }] });
        }

        const isMatch = await bcrypt.compare(password, register.password);

        if(!isMatch){
            return res
                .status(400)
                .json({ errors: [{msg: 'Неверные данные'}] })
        }

        const payload = {
          register: {
            id: register.id
          }
        };

        jwt.sign(
          payload,
          process.env.ENTRYTOKEN,
          {expiresIn: 360000},
          (err, entry_token) => {
            if(err) throw err
            res.json({entry_token})
          }
        )

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

exports.getSingelRegister = async (req, res) => {
  try {
    const register = await Register.findById(req.params.id);
    if(!register){
      return res.status(404).json({
        message: 'Такой пароль не найден'
      })
    }else{
      res.json(register)
    }
  } catch (err) {
    console.log(err)
  }
}

exports.registerList = async (req, res) => {
  try {
    const list = await Register.find();
    if(!list){
      return res.status(400).json({
        message: 'Пока не создан пароль для входа регистрации сотрудников'
      })
    }else{
      return res.json({
        length: list.length,
        list}) 
    }
  } catch (err) {
    
  }
}

exports.deleteRegister = async (req, res) => {
  try {
    const register = await Register.findByIdAndDelete(req.params.id);
    if(!register){
      return res.status(400).json({
        message: 'Пароль с таким названием не найден'
      })
    }else{
      res.json({
        success: true
      })
    }
  } catch (err) {
    
  }
}