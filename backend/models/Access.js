const { Schema, model } = require('mongoose');

const accessSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = model('Access', accessSchema);