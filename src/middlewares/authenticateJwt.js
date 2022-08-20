import jwt from "jsonwebtoken";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const jwtKey = process.env.JWT_KEY;

        jwt.verify(token, jwtKey, (err, tokenData) => {
            if (err) {
                //return res.sendStatus(403);
                return res.status(403).json({ error: err.name +': '+ err.message });
            }
            
            req.user = tokenData.id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJwt;