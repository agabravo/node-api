const polka = require('polka');
const Sequelize = require('sequelize');
const app = require('./app');

const PORT = 3000;

const routes = (app) => {
  readdirSync(`${__dirname}/controllers`).filter(isDirectory).forEach(o => {
    require(`./controllers/${o}/index.js`)(app);
  });
}

const awsDB = new Sequelize('api_db', 'api_db_user', '1234abcd', {
  dialect: 'postgres',
  host: "apidb.ckemdgxc8x7t.us-east-2.rds.amazonaws.com",
  port: 5432,
})


const googleDB = new Sequelize('postgres', 'postgres', '1234abcd', {
  dialect: 'postgres',
  host: "35.193.151.178",
  port: 5432,
})

awsDB
  .authenticate()
  .then(() => {
    console.log('Connection with AWS has been established successfully. Continue with Google Cloud');
    googleDB
      .authenticate()
      .then(() => {
        console.log('Connection with Google has been established successfully. Starting Server...');
        app.listen(3000, err => {
          console.log(`> Running on localhost:3000`);
        });
      })
  })
  .catch(err => {
    console.error('Unable to connect to databases:', err);
  });
