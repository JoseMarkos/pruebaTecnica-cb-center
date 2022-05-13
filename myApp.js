let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const {findById, save, addQuestions, getQuestions} = require('./controllers/examenes');
require('dotenv').config();

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/crear-nuevo-examen', function(req, res) {
  save(req, res);
});

app.get('/crear-nuevo-examen/:id', function(req, res) {
  findById(req, res);
});

app.put('/crear-nuevo-examen/:id', function(req, res) {
  addQuestions(req, res);
});

app.get('/crear-preguntas/:id', function(req, res) {
  res.sendFile(__dirname + '/views/crearNuevoExamen.html');
});

app.get('/examen/:id', function(req, res) {
  res.sendFile(__dirname + '/views/examen.html');
});

app.get('/examen-preguntas/:uid', function(req, res) {
  getQuestions(req, res);
});





































 module.exports = app;
