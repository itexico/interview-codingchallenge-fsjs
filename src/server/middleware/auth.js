import jwt from "jsonwebtoken";

const { JWT_KEY } = process.env;

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication has failed!" });
    }
}

export default auth;