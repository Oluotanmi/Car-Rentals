import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

const expireDate = new Date (Date.now() + 3600000)

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    // const username = "bukunmi";
    // const email = "bukunmi@yahoo.com";
    // const password = "tyu123"
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
};

export const signIn = async (req, res, next) => {

    const { email, password } = req.body;


    try {
       const validUser = await User.findOne({ email });
       if(!validUser) return next(errorHandler(404, "user not found"));

       const validPassword = bcryptjs.compareSync(password, validUser.password);
       if(!validPassword) return next(errorHandler(401, "wrong credentials"));

       let refreshToken = "";
       let accessToken = "";

       
       accessToken = Jwt.sign({ id:validUser._id }, process.env.JWT_ACCESS_SECRET, {
         expiresIn: "10m"
       } );
       refreshToken = Jwt.sign({ id: validUser._id },process.env.JWT_REFRESH_SECRET, {
         expiresIn: "7d"
       });

       const updateData = await User.findByIdAndUpdate(
        { _id: validUser._id },
        { refreshToken },
        { new: true }
       );

       const { password: hashedPassword, isAdmin, ...rest } = updateData._doc;

          //not sending users hashed password to frontend
        const responsePayload = {
            refreshToken: refreshToken,
            accessToken,
            isAdmin,
            ...rest,
        };
    
        req.user = {
            ...rest,
            isAdmin: validUser.isAdmin,
            isUser: validUser.isUser,
        };

        res.status(200).json(responsePayload)

    } catch(error) {
        next(error);
        console.log(error)
    }
}