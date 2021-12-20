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
    const { email, password } = req.body;

    var loginError = {
        email: {
            class: "",
            error: ""
        },
        password: {
            class: "",
            error: ""
        },
        general: {
            class: "",
            error: ""
        }
    }

    console.log('--------------------------------------------------')
    console.log(req.body);
    console.log('--------------')
    console.log(loginError)
    console.log('--------------')

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array({ onlyFirstError: true }))
        console.log('--------------')
        errors.array({ onlyFirstError: true }).forEach(error => {
            var errorObject = {};
            var param = error['param'];
            errorObject.class = "invalid";
            errorObject.error = error.msg;
            loginError[param] = errorObject;
        })
        console.log(loginError)
        console.log('--------------')
        return res.render('login', { loginError });
    } else {
        console.log("No errors.")
        User.findOne({
            email
        }).exec((err, user) => {
            if (err || !user) {
                loginError.general.error = "User with this email does not exist. Please signup first."
                return res.render('login', { loginError });
            } else if (!user.authenticate(password)) {
                loginError.general.error = "Wrong Password. Please try again."
                return res.render('login', { loginError });
            } else {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        name: user.name
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '7d'
                    }
                );
                res.cookie('auth', token);
                res.redirect('/dashboard');
            }
        });
    }
    console.log('--------------------------------------------------')
}

exports.signoutController = (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET, // req.user._id
    algorithms: ['HS256'],
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.cookies.auth) {
            return req.cookies.auth;
        }
        return null;
      }
});