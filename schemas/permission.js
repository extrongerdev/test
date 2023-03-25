const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    permission: {
        type: String,
        required: true
    }
});

const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = { Permission };