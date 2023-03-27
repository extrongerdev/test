const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// create express server
const app = express();

// database connection
dbConnection();

// CORS capa de seguridad
app.use(cors());

// Directorio publicoauth/login
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Registro de rutas para que  el framework  las reconozca
app.use( '/api/auth', require('./routes/auth.routes'));
app.use( '/api/users', require('./routes/user.routes'));
app.use( '/api/permissions', require('./routes/permissions.routes'));

// TODO: CRUD: Eventos

//Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})