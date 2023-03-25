const { Schema, model } = require('mongoose');
const uuid = require('uuid')

const userSchema = new Schema({
    _id: { type: String, default: uuid.v4() },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    permissions : [{ type: String, ref: 'Permission' }],
    accesses : [{ type: String, ref: 'Access' }]

});

module.exports = model('User', userSchema);
