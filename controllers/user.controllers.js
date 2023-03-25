import User from "../schemas/user.js";

export const listAll = async (req, res) => {
    User.find()
        .then((usersFound) => {
            res.json ({results: usersFound})
        })
        .catch((error) => {
            console.log(error)
            res.status(error.status).send ("Something was wrong.")
        });
};