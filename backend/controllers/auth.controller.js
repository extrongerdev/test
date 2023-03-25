const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Access = require("../models/Access");
const Permission = require("../models/Permission");
const {generateJWT} = require("../helpers/jwt");

const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userFound = await User.findOne({email});
        if (!userFound) {
            const userStored = new User(req.body);

            // Encriptar contraseña
            const salt = bcrypt.genSaltSync(); //valor por defecto 10 vueltas
            userStored.password = bcrypt.hashSync(password, salt);

            userStored.save();

            res.status(201).json({
                ok: true,
                uuid: userStored.id,
                name: userStored.name,
                email: userStored.email
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: "User already exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please speak with the administrator",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userFound = await User.findOne({email});
        if (userFound) {
            //Confirm password, recibe el password que escribe el usuario vs el password almacenado en la BD
            const validPassword = bcrypt.compareSync(password, userFound.password); // return true or false
            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: "Invalid password",
                });
            }

            saveAccessWhenUserLoginSuccessfully(userFound, res);
            const permissions = await Permission.find({user: userFound._id});
            const token = generateJWT(userFound.id, userFound.name);

            res.json({
                ok: true,
                uuid: userFound.id,
                name: userFound.name,
                email: userFound.email,
                permissions: permissions,
                token
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: "The user doesn't exist",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please speak with the administrator",
        });
    }
};

const renewToken = async (req, res) => {
    const {uid, name} = req;
    const token = await generateJWT(uid, name);
    res.json({ok: true, token});
};

const saveAccessWhenUserLoginSuccessfully = async (user, res) => {
    try {
        const access = new Access();
        access.user = user;
        await access.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Please speak with the administrator",
        });
    }
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
};
