'use strict';
module.exports = (sequelize, DataTypes) => {
  const employees = sequelize.define('employees', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department_id: DataTypes.INTEGER,
    // employee_id: DataTypes.INTEGER
  },
    {});

  return employees;
};