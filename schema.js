const Joi = require('@hapi/joi')

//Department validation
const bodySchema = Joi.object({
    name: Joi.string().min(2).required(),
    shift: Joi.string().required().min(3)
})

//Employee validation
const empBodySchema = Joi.object({
    name: Joi.string().min(2).required(),
    department_id: Joi.allow()
})

//Email validaiton
const emailQuerySchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: ['com', 'net'] } })
})

//Subscriber validation
const subBodySchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    message: Joi.string().allow(),
    photo: Joi.allow()
})

module.exports = { bodySchema, empBodySchema, subBodySchema, emailQuerySchema }