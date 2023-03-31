const Joi = require('joi');

const validator = (schema) => (payload) => 
schema.validate(payload, {abortEarly: false});

const signupSchema = Joi.object({
    name: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    // confirmPassword: Joi.ref("password"),
    //address:{
         // Joi.string().length(2).required(),
         //},
         //DOB: joi.date().greater(new Date("2012-01-01")).required(),
         //referred: Joi.boolen().required(),
         //referralDetails: Joi.string().when('referred, {
            //is: true,
            // then: Joi.string().required().min(4}.max(50).
            // otherwise: Joi.striing().optionl()
        // })
        // hobbies: Joi.array().items([Joi.string(), Joi.number()]),
        // acceptTos: Joi.boolen().truthly("Yes").valid(true).required(),
        });
 
exports.validateSignup = validator(signupSchema);