const User = require('../models').User;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await User.findOne({
            where:{
                jwt:token,
            }
        });
        if (!user) {
            throw new Error()
        }
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate.' })
    }
};
module.exports = auth;
