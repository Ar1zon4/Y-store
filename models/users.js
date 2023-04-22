const sequelize=require('../database/db')
const Sequelize=require('sequelize')

const user = sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone:{
        type:Sequelize.INTEGER(11),
        allowNull:false

    },
    remarks:{
        type:Sequelize.STRING,
        // allowNull:false,
    },
    role:{
        type:Sequelize.STRING,
    },
    password:{
      type:Sequelize.STRING,
      allowNull:false
    }
})

module.exports=user