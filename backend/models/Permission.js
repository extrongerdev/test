const { Schema, model } = require('mongoose');

const permissionsSchema = new Schema({
    user: {
        type: String,
        ref: 'user'
    },
    permission: {
        type: String,
        require: true
    },
});

module.exports = model('Permissions', permissionsSchema);