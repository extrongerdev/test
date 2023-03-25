const Access = require("../models/Access");

const findAllByUserId = async (req, res) => {
    const userId = req.params.userId;
    const accessFound = await Access.find({user: userId});
    if (accessFound) {
        res.json({results: accessFound});
    }
};

module.exports = {
    findAllByUserId
};