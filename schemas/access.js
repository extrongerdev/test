const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

const Access = mongoose.model("Access", AccessSchema);

module.exports = { Access };