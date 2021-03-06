'use strict'

module.exports = function(sequelize, DataTypes) {
  var Project = sequelize.define(
    'Project',
    {
      name: DataTypes.STRING,
      org: DataTypes.STRING,
      vcs: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        },
      },
    },
  )
  return Project
}
