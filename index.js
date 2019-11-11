const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()
const Sequelize = require('sequelize');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Joi = require('@hapi/joi')
const app = require('express')()
const validator = require('express-joi-validation').createValidator({ passError: true })
const { bodySchema, empBodySchema, subBodySchema, emailQuerySchema } = require('./schema');

//REQUIRING ROUTES
const departmentRoute = require('./controllers/department');
const employeeRoute = require('./controllers/employee');
const salaryRoute = require('./controllers/salary');
const subscriberRoute = require('./controllers/subscriber')

//CORS SETUP
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//BODYPARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//FILEUPLOAD MIDDLEWARE
app.use(fileUpload());
app.use(express.static(process.env.STATIC_FILE))

//DEPARTMENT ROUTES
app.get('/department', departmentRoute.getDepartment)
app.post('/department', validator.body(bodySchema), departmentRoute.postDepartment)
app.get('/department/:deptName', departmentRoute.getDeptEmployee)

//EMPLOYEE ROUTES
app.get('/employee', employeeRoute.getEmployee)
app.get('/employee/:department_id', employeeRoute.employeeByDeptId)
app.post('/employee', validator.body(empBodySchema), employeeRoute.postEmployee)

//SUBSCRIBER ROUTES
app.get('/subscriber/:email', validator.query(emailQuerySchema), subscriberRoute.getSubscriber)
app.post('/subscriber', validator.body(subBodySchema), subscriberRoute.postContact)
app.patch('/subscriber', subscriberRoute.patchSubscriber)

//ERROR HANDLER
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).send(err.type);
        console.log(err.type);
        // json({
        //     type: err.type, // will be "query" here, but could be "headers", "body", or "params"
        //     message: err.error.toString()
        // });
    } else {
        // pass on to another error handler
        next(err);
    }
});

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('listening on port 3000')
});
