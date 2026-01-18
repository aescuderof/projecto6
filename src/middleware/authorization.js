const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Sin token' });
    }

    const [scheme, token] = authorization.split(' ');

    if (!token || (scheme !== 'Bearer' && scheme !== 'Token')) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido', error: error.message });
    }

}