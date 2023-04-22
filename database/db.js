const Sequelize = require('sequelize');

const sequelize = new Sequelize('y-store', "root", '', {
    host:'localhost',
    dialect:'mysql'
});
module.exports = sequelize;