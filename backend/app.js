var ApiBuilder = require('claudia-api-builder'),
  api = new ApiBuilder();
var mysql = require('mysql');
var {Op, Sequelize} = require('sequelize');

module.exports = api;

api.get('/characters', function () {
  return new Promise(
    (resolve, reject) => {
      loadDatabase()
      .then((db) => {
        resolve(getCharacters(db));
      })
      .catch((ex) => {
        reject( `Ok, something went seriously wrong...\n ${ex.message}`);
      });
  });    
});

function loadDatabase() {
    var {Op, Sequelize} = require('sequelize');
    return new Promise(
      (resolve, reject) => {
        const db = {};
        const sequelize = new Sequelize(
          'backend', 
          'admin',
          'backend1234', 
          {
            host: 'backend.<YOUR APP ID>.<YOUR AWS REGION>.rds.amazonaws.com',
            dialect: 'mysql',
            port:'3305',
            pool: {
              max: 5,
              min: 0,
              idle: 300
            }
        });
        sequelize
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
            //Models/tables
            db.characters = require('./models/characters.js')(sequelize,Sequelize); 
            db.Sequelize = Sequelize;  
            db.sequelize = sequelize;
            db.op=Op;
            resolve(db);
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
            reject(err);
          });
      });
}

function getCharacters(db) {
  return new Promise(
    (resolve, reject) => {
      db.characters.findAll().then(function(result) {
        db.sequelize.connectionManager.close();
        resolve(result);
    }).error(function (err) {
        console.log("Error:" + err);
        reject(err);
    });
});
}