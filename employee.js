const models = require('../models');
const department = models.department;
const employee = models.employees

department.hasMany(employee, { foreignKey: 'department_id' });
employee.belongsTo(department, { foreignKey: 'department_id' });

module.exports = {
    getEmployee: function (req, res) {
        try {
            employee.findAll()
                .then(employees => {
                    if (employees) {
                        return res.status(200).json(employees)
                    } else {
                        return res.status(500).send({ "message": "something went wrong" });
                    }
                })
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    employeeByDeptId: function (req, res) {
        try {
            employee.findAll({
                include: [{
                    model: department
                }]
            }).then(employeeCom => {
                if (employeeCom) {

                    return res.status(200).send(employeeCom);
                } else {
                    return res.status(500).send({ "message": "Something went wrong" });
                }
            })
        } catch (ex) {
            return res.status(500).send(ex);
        }
    },
    postEmployee: function (req, res) {
        try {
            employee.create(req.body)
                .then(employeeData => {
                    return res.json(employeeData);
                })
        } catch (error) {
            return res.status(400).send({ "Error": error });
        }
    }
}
