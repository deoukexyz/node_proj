const models = require('../models');
const department = models.department;
const employee = models.employees

department.hasMany(employee, { foreignKey: 'department_id' });
employee.belongsTo(department, { foreignKey: 'department_id' });

module.exports = {
    getDepartment: function (req, res, next) {
        try {
            department.findAll()
                .then(deps => {
                    console.log(deps)
                    if (deps) {
                        return res.status(200).json({ "deps": deps })
                    } else {
                        return res.status(500).send({ "message": "Fail to load departments" });
                    }

                })
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    postDepartment: function (req, res) {
        try {
            department.findOne({
                where: {
                    name: req.body.name
                }
            }).then(result => {
                if (!result) {
                    try {
                        department.create(req.body)
                            .then(departData => {
                                return res.json(departData)
                            })
                    } catch (error) {
                        return res.status(400).send({ "Error": error })
                    }
                } else {
                    return res.status(400).send("Already exist")
                }
            })
        } catch (error) {
            return res.status(400).send({ "Error": error })
        }
    }, getDeptEmployee: function (req, res) {
        try {
            department.findAll({
                where: {
                    name: req.params.deptName
                },
                attributes: [['name', 'department Name']],
                include: [{
                    model: employee,

                }]
            })
                .then(deptEmpData => {
                    return res.status(200).json(deptEmpData)
                })
        } catch (error) {
            return res.status(500).send({ "Error": error })
        }
    }
}
