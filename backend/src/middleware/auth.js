const jwt = require('jsonwebtoken');
const User = require('../models/User');

let auth = async (req, res, next) => {
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'];

    // Bearer ooerkogkeorkgoek.erogkoerkog.eorgkoerkgoerkgokg
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(401).send('인증 토큰이 필요합니다.');
    }

    try {
        // 토큰이 유효한 토큰인지 확인
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);

        const user = await User.findOne({ "_id": decoded.userId });
        if (!user) {
            console.log('User not found:', decoded.userId);
            return res.status(404).send('존재하지 않는 사용자입니다.');
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Token verification error:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(403).send('토큰이 만료되었습니다.');
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).send('토큰이 유효하지 않습니다.');
        } else {
            return res.status(500).send('서버 오류가 발생했습니다.');
        }
    }
}

module.exports = auth;

