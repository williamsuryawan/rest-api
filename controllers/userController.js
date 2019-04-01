const Model = require('../models')
const bcrypt = require('bcrypt')
const jwtConvert = require('jsonwebtoken')

class UserController {
    static async findAll (req,res) {
        try {
            let users = await Model.User.findAll({})
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async create (req,res) {
        try {
            let newUser = await Model.User.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json(err)
        }
            
    }

    static async findByPk (req,res) {
        try {
            let user = await Model.User.findByPk(req.params.id)
            if(user == null) {
                throw new Error("Can't find user")
            } else {
                res.status(200).json(user)
            }
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    }

    static async update(req,res) {
        console.log("masuk update", req.body, req.params)
        let updatedUser = await Model.User.update({
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 5),
                    role: req.body.role
                }, {where: {id:req.params.id}})
        let result = await Model.User.findOne({where: {id:req.params.id}})
        res.status(200).json(result)
    }

    static async delete(req,res) {
        console.log("masuk ke method delete", req.params)
        try {
            let deletedUser = Model.User.destroy({where: {id: req.params.id}})
            res.status(200).json({msg: "Deleting user is success"})
        } catch(err) {
            res.status(500).json(err)
        }
    }

    static async signup (req,res) {
        try{
            let newUser = await Model.User.create(req.body)
            res.status(201).json(newUser)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static signin(req,res) {
        Model
            .User
            .findOne({where: {email: req.body.email}})
            .then(foundUser => {
                if(!foundUser) {
                    res.status(409).json({message: 'Wrong email/password'})
                } else {
                    let isValid = bcrypt.compareSync(req.body.password, foundUser.password)
                    if(isValid) {
                        let token = jwtConvert.sign({id: foundUser.id, email: foundUser.email, role: foundUser.role}, process.env.SECRET)
                        res.status(200).json({accessToken: token})
                    } else {
                        res.status(409).json({message: 'Wrong email/password'})
                    }
                }
            })
    }
}
module.exports = UserController;