const sequelize = require('sequelize');

class User extends Model {}
User.init({
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true}
  name: { type: sequelize.STRING }
})
