const polka = require('polka');
const Sequelize = require('sequelize');
const app = require('./app');
const PlotModel = require('./models/plotModel.js')
const PORT = 3000;

const routes = (app) => {
  readdirSync(`${__dirname}/controllers`).filter(isDirectory).forEach(o => {
    require(`./controllers/${o}/index.js`)(app);
  });
}

try {
  var db_parcelas = new Sequelize('ec2ce_data_sigpac', 'emergya', 'fTo;Q3U74Pvh', {
    define: {
      freezeTableName: true
    },
    dialect: 'postgres',
    host: "oliviagpc.crsfqfthjuif.eu-west-1.rds.amazonaws.com",
    port: 5432,
  })
} catch (e) {
    return console.error('Unable to connect to database:', e);
}

const Plot = PlotModel(db_parcelas, Sequelize)

app
  .get('/api/plot/:sigpac', (req, res, next) => {
    console.log(`Searching Plot with Sigpac =>`, req.params.sigpac);
    Plot
      .findOne({
        where: {sigpac: req.params.sigpac}
      }).then((plot) => {
        console.log(plot);
      })
    return next();
  })
  .get('/', (req, res, next) => {
    console.log('Hola mundo');
    return next();
  })
  .listen(PORT, err => {
    if(err) {
      console.error(err);
    }
  });
