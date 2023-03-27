const { Schema, model } = require('mongoose');
const uuid = require('uuid')

const userSchema = new Schema({
    // como el enunciado decia uuid generado
    // instalamos la libreria uuid que es para genear id de ese formato
    // y aca la utilizamos para generar el id de tipo uuuid en la base de datos para el usuario
    _id: { type: String, default: uuid.v4() },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,

        // email debe sser unico en la db
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    // esto se usa para hacer una referencia que hayy relacion de usuario con permisos y accesos
    // por alguna razon moongose no pobla los permisos y accesos de forma auttomattica
    // por esa razon lo hicimos de forma manual en el user.controller linea 12 a 14
    permissions : [{ type: String, ref: 'Permission' }],
    accesses : [{ type: String, ref: 'Access' }]

});

module.exports = model('User', userSchema);
