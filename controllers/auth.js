const User = require('../models/auth')
const expressJwt = require('express-jwt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbError');

exports.registerController = (req, res) => {
    const { name, email, password, password2 } = req.body;

    var registerError = {
        name: {
            class: "",
            error: ""
        },
        email: {
            class: "",
            error: ""
        },
        password: {
            class: "",
            error: ""
        },
        password2: {
            class: "",
            error: ""
        },
        general: {
            class: "",
            error: ""
        }
    }

    // console.log('--------------------------------------------------')
    // console.log(req.body);
    // console.log('--------------')
    // console.log(registerError)
    // console.log('--------------')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // console.log(errors.array({ onlyFirstError: true }))
        // console.log('--------------')
        errors.array({ onlyFirstError: true }).forEach(error => {
            var errorObject = {};
            var param = error['param'];
            errorObject.class = "invalid";
            errorObject.error = error.msg;
            registerError[param] = errorObject;
        })
        // console.log(registerError)
        // console.log('--------------')
        return res.render('register', { registerError });
    } else {
        console.log("No errors.")
        User.findOne({
            email
        }).exec((err, user) => {
            if (user) {
                registerError.email.class = "invalid";
                registerError.email.error = "An account with this email address already exists."
                return res.render('register', { registerError });
            } else {
                const user = new User({
                    name,
                    email,
                    password
                });
        
                user.save((err, user) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        registerError.general.error = errorHandler(err);
                        return res.render('register', { registerError })
                    } else {
                        // return res.json({
                        //     success: true,
                        //     message: user,
                        //     message: 'Signup success'
                        // });
                        return res.redirect('/login')
                    }
                });
            }
        });
    }
    // console.log('--------------------------------------------------')
}

exports.loginController = (req, res) => {

}