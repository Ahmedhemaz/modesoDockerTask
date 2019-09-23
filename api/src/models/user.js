'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/local-env');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
          args: 5,
          msg: "fullName must be at least 15 characters in length"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,

    } ,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    },
    userName: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        len:{
          args: 5,
          msg: "userName must be at least 5 characters in length"
        }
      }
    },
    jwt: DataTypes.STRING
  }, {});

  User.beforeCreate(async (user,option)=>{
    user.jwt =  jwt.sign({id:user.id,email:user.email},JWT_SECRET);
    user.password = await bcrypt.hash(user.password,saltRounds);
  });
  User.beforeUpdate( async (user,option)=>{


    const match =  await bcrypt.compare(user.password, user.previous('password'));
    if (match){
      console.log("match");
      throw new Error("Same Old Password Enter New One");
    }else {
      if (user.password === user.previous('password') || user.password ===""){
        user.password = await user.previous('password');
      }else {
        user.password = await bcrypt.hash(user.password,saltRounds);
      }
    }

  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Note,{
      foreignKey: 'userId',
      as: 'userNotes'
    });
  };
  return User;
};
