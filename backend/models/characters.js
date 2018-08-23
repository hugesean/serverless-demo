'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Characters = sequelize.define('characters', {
          characterId:{
            type:DataTypes.INTEGER,
            primaryKey: true
          },
          name:DataTypes.STRING,
          actor:DataTypes.STRING,
          description:DataTypes.STRING,
          debut:DataTypes.STRING,
          airDate:DataTypes.DATE
          },
        {
        freezeTableName: true,
        primaryKey: true,
        timestamps: false
      }
      );
  
  return Characters;
};