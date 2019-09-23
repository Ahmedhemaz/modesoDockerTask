'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args: 5,
          msg: "Title must be at least 5 characters in length"
        }
      }
    } ,
    content: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:{
          args: [25,255],
          msg: "Content must be between 25 to 255 character"
          }
       }
      },
    image: DataTypes.STRING,
    public:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      set: function(value) {
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        this.setDataValue('public', value);
      }
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User,{
      foreignKey:'userId',
      onDelete: 'CASCADE'
    })
  };
  return Note;
};
