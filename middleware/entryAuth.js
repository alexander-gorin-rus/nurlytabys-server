const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Get token from header
    const entry_token = req.header('entry-auth-token');

    //Check if not token
    if(!entry_token){
        return res
            .status(401)
            .json({msg: "Нет доступа. Нет цифровой подписи"})
    }

    //Verify token
    try {
        const decoded = jwt.verify(entry_token, process.env.ENTRYTOKEN);
        req.register = decoded.register;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Цифровая подпись недействительна' });
    }
}