const Access = require("../models/Access");
const Permission = require("../models/Permission");
const User = require("../models/User");

const listAll = async (req, res) => {
    const userIdOfLoggedUserFromToken = req.uuid;
    let listOfUsers = await User.find();
    // llenar accesos y permisos a los usuarios encontrados
    for await (let user of listOfUsers) {
        await fillAccessesAndPermissionsToUser(user);
    }
    res.status(200).json ({results: listOfUsers})
}

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const {name, email} = req.body;
    await User.findByIdAndUpdate(userId, { name, email });
    res.status(200).json ({msg: "success"});
}

const deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json ({msg: "success"});
}

const fillAccessesAndPermissionsToUser = async (user) => {
    user.accesses = await Access.find({user: user._id}).sort({createdAt: -1});
    user.permissions = await Permission.find({user: user._id});
}

module.exports = {
    listAll,
    updateUser,
    deleteUser
};