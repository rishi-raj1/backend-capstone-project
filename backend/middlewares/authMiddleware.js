import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;



export const authenticateToken = (req, res, next) => {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({ msg: 'Token is missing' });
    }

    jwt.verify(token, ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({
                msg: 'Invalid Token'
            })
        }

        req.body.user = user;
        next();
    })
}