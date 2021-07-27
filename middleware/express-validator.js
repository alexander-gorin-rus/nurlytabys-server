const { check, validationResult } = require('express-validator');

exports.registerValidation = [
    check('name', 'Необходимо указать имя')
        .not()
        .isEmpty(),
    check('lastName', 'Необходимо указать фамилию')
        .not()
        .isEmpty(),
    check('email', 'Необходимо указать почту')
        .isEmail(),
    check('phone', 'Не верно указан номер телефона. Правильная форма без пробелов: +77771112233')
        .isMobilePhone(),
    check('password', 'Пароль слишком короткий, пароль должен состоять не менее чем из шести символов')
        .isLength({ min: 6 }), 
            (req, res, next) => {
                const errors = validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({errors: errors.array()});
                    }
            next();
        }
]

exports.loginValidation = [
    check('email', 'Неверные данные')
        .isEmail(),
    check('password', 'Неверные данные')
        .exists(), 
            (req, res, next) => {
                const errors = validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({errors: errors.array()});
                    }
            next();
        }
]

exports.categoryValidation = [
    check('name', 'Необходимо указать название категории')
        .not()
        .isEmpty(), 
            (req, res, next) => {
                const errors = validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({errors: errors.array()});
                    }
            next();
        }
]