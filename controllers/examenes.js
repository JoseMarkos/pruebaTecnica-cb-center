const pool  = require('../db');

const save = (req, res) => {
  let { nombreExamen, cantidadPreguntas } = req.body;
  
  if (5 < cantidadPreguntas) {
    cantidadPreguntas = 5;
  }

  let sql = `
  INSERT INTO examenes(
    nombre,
    cantidad_preguntas,
    uid
  )
  VALUES(
    '${nombreExamen}',
    '${cantidadPreguntas}',
    UUID_SHORT()
  )
  `;
  
  let con = null;

  pool.then(function(p){
    return p.getConnection();
  }).then(function(connection){
    con = connection;
    return con.query(sql);
  }).then(function(rows) {
    con.release();
    res.json({id:rows.insertId});
  }).catch(function(error) {
    console.log(error);
    res.json({status: 'fail'});
  });
};

const findById = (req, res) => {
  let sql = `SELECT cantidad_preguntas FROM examenes WHERE id = ${req.params.id};`;
  let con = null;

  pool.then(function(p){
    return p.getConnection();
  }).then(function(connection){
    con = connection;
    return con.query(sql);
  }).then(function(rows) {
    console.log(rows[0]);
    con.release();
    const { cantidad_preguntas } = rows[0];
    res.json({cantidadPreguntas: cantidad_preguntas});
  }).catch(function(error) {
    console.log(error);
    res.json({status: 'fail'});
  });
};

const addQuestions = (req, res) => {
  let { preguntas, id } = req.body;
  let sql = `
  UPDATE examenes
  SET
    preguntas = '${preguntas}'
  WHERE
    id = ${id};
  `;
  pool.then(function(p){
    return p.getConnection();
  }).then(function(connection){
    con = connection;
    return con.query(sql);
  }).then(function(rows) {
    return con.query('SELECT uid FROM examenes WHERE id = ' + id);
  }).then(function(rows) {
    con.release();
    res.json({url:rows[0].uid});
  }).catch(function(error) {
    console.log(error);
    res.json({status: 'fail'});
  });
};

const getQuestions = (req, res) => {
  let sql = `SELECT preguntas, nombre FROM examenes WHERE uid = ${req.params.uid};`;
  let con = null;

  pool.then(function(p){
    return p.getConnection();
  }).then(function(connection){
    con = connection;
    return con.query(sql);
  }).then(function(rows) {
    console.log(rows);
    con.release();
    const { preguntas, nombre } = rows[rows.length - 1];
    res.json({preguntas: preguntas, text: nombre});
  }).catch(function(error) {
    console.log(error);
    res.json({status: 'fail'});
  });
};

module.exports = { 
  findById,
  save,
  addQuestions,
  getQuestions
}