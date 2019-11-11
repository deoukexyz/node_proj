'use strict';
module.exports = (sequelize, DataTypes) => {
  const salary = sequelize.define('salary', {
    // salary_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    salaryCount: DataTypes.INTEGER
  },
    {});

  return salary;
};