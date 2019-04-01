const jwt = require('jsonwebtoken')
const Model = require('../models')

module.exports = {
    authentication: function (req,res, next) {
        if(req.headers.hasOwnProperty('token')) {
            console.log("Input verifikasi JWT", req.headers.hasOwnProperty('token'), req.headers)
            try {
                const decoded = jwt.verify(req.headers.token, process.env.SECRET);
                console.log("Hasil verifikasi JWT", decoded)
                if( decoded != null) {
                    req.loggedInUser = decoded;
                    next()
                } else {
                    res.status(400).json({
                        message: 'Invalid Token'
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    },
    authorization: function(req, res, next) {
        console.log("Input Authorization", req.loggedInUser)
        if(req.loggedInUser.role == 'admin') {
            next()
        } else {
            res.status(401).json({
                message: "You dont have any authorization"
            })
        }
    },
    userAuthentication: function (req,res, next) {
        console.log("Input User Authentication", req.loggedInUser, req.params)
        Model.User
            .findByPk(req.params.id)
            .then(foundUser => {
                console.log("Hasil findbyId for UserAuthentication", req.loggedInUser.id, foundUser.id)
                if(req.loggedInUser.id == foundUser.id) {
                    next()
                } else {
                    res.status(401).json({
                        message: "Only the same user who can access this "
                    })
                }
            })
        
    }
}