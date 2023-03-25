const Permission = require("../models/Permission");
const User = require("../models/User");
const mongoose = require('mongoose');

const findAllByUserId = async (req, res) => {
    const userId = req.params.userId;
    const permissionsByUser = await Permission.find({user: userId});
    if (permissionsByUser) {
        res.json({results: permissionsByUser});
    }
};

const associateToUserById = async (req, res) => {
    const userId = req.params.userId;
    const userFound = await User.findOne({_id: userId});
    if (userFound) {
        const permissionToAssign = req.body.permission;
        const isPermissionStored = await Permission.findOne({user: userFound._id, permission: permissionToAssign});
        if (!isPermissionStored) {
            const permissionToSave = new Permission({user: userFound, permission: permissionToAssign});
            permissionToSave.save();
            return res.status(200).json({
                ok: true,
                msg: "Success"
            });
        } else {
            return res.status(400).json({
                ok: false,
                msg: "The user already have that permission.",
            });
        }
    }
};

module.exports = {
    findAllByUserId,
    associateToUserById
};