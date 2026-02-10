import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";



export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isUser: true
        });
        await newUser.save()
        res.status(200).json({message: "Account created successfuly"})
    } catch (error) {
        next(error);
    }
}

//refreshTokens
export const refreshToken = async (req, res, next) => {
    
    if(!req.headers.authorization) {
        return next(errorHandler(403,"bad request no header provided"))
    };

    const refreshToken = req.headers.authorization.split(" ")[1].split(",")[0];
}