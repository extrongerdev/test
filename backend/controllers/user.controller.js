const User = require("../models/User");

const listAll = async (req, res) => {
    const userIdOfLoggedUserFromToken = req.uuid;
    const listOfUsers = await User.find({_id: { $ne: userIdOfLoggedUserFromToken } }).populate("permissions");
    if (listOfUsers) {
        res.status(200).json ({results: listOfUsers})
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const {name, email} = req.body;
    const userUpdated = await User.findByIdAndUpdate(userId, { name, email });
    res.status(200).json ({msg: "success"});
}

const deleteUser = async (req, res) => {
    await User.findOneAndDelete(req.params.id);
    res.status(200).json ({msg: "success"});
}

module.exports = {
    listAll,
    updateUser,
    deleteUser
};