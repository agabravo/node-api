// Cargamos los módulos de polka y body-parser
var polka = require('polka');
var bodyParser = require('body-parser');

// Llamamos a polka para poder crear el servidor
var app = polka();

// Importamos las rutas
var user_routes = require('./routes/user'); 

//cargar middlewares
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cargamos las rutas
app.use('/api', user_routes);

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;
