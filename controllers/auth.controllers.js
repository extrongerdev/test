import User from "../schemas/user.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export const signup = async (req, res) => {
    const { full_name, email, password } = req.body;
    const newUser = new User({ full_name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    const savedUser = await newUser.save();
    res.status(201).send({id: savedUser._id});
};

export const signin = async (req, res) => {
    const userFound = await User.findOne({email:req.body.email});
    if(userFound) {
        if (bcrypt.compare(userFound.password, req.body.password)) {
            const accessToken = generateAccessToken({user: req.body.name})
            res.json ({accessToken: accessToken})
        } else {
            res.status(401).send("Password Incorrect.")
        }
    } else {
        res.status(404).send ("User does not exist.")
    }
};

const generateAccessToken = (user) => {
    return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}
