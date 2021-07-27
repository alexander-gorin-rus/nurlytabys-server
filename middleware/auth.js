const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        return res
            .status(401)
            .json({msg: "Нет доступа. Нет цифровой подписи"})
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JSONWEBTOKEN);
        req.employee = decoded.employee;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Цифровая подпись недействительна' });
    }
}