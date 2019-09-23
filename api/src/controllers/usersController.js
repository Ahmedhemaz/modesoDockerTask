const User = require('../models').User;
const Note = require('../models').Note;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/local-env');


const index = (req,res)=>{
    return User
        .findByPk(req.user.id,{
            attributes:['fullName','email','userName']
        })
        .then(user => {
            res.status(200).send({data:user});
        })
        .catch(error=> res.status(400).send(error))
};


const store = (req,res)=>{
    return  User
        .create({
            fullName: req.body.fullName,
            password: req.body.password,
            email:    req.body.email,
            userName: req.body.userName
        })
        .then(user =>{
            res.status(200).send({data:{user:user,token:user.jwt}});
        })
        .catch(error => res.status(400).send({message:(error.errors[0].message)?error.errors[0].message:"Bad Request"}))

};

const login = (req,res)=>{
    User.findOne({
        where:{
            email: req.body.email
        }
    })
        .then(user=>{
            const token = jwt.sign({id:user.id,email:user.email},JWT_SECRET);
            user.update({jwt:token}) ;
            bcrypt.compare(req.body.password,user.password,(compareError,compareResponse)=>{
                if (compareResponse){
                    return  res.status(200).send({data:{user:user,token:token}})
                }
                return res.status(400).send({
                    message: 'Wrong Credentials'
                });
            });
        })
        .catch(error => res.status(400).send({
            message: 'Wrong Credentials'
        }))
};

const logout = (req,res)=>{
    req.user.update({jwt:null})
        .then(()=>  res.status(205).send({message:"logged out successfully"}))
        .catch(error=> res.status(400).send(error))
};

const show = (req,res)=>{
    return Note.findAll({
        where:{
            userId: req.params.id
        }
    })
        .then(notes=>{
            if (notes.length === 0){
                return res.status(204).send({
                    message: "No Content"
                })
            }
            if (parseInt(req.params.id)  === req.user.id){
                return res.status(200).send({data:{notes:notes}});
            }
            if(req.params.id !== req.user.id){
                notes = notes.filter(note => note.dataValues.public === true);
                return res.status(200).send({data:{notes:notes}});
            }
        }).catch(error=> res.status(400).send(error))
};

const update =  (req,res)=>{
    return req.user.update({
        fullName: (req.body.fullName === undefined || req.body.fullName === "")?  req.user.fullName : req.body.fullName,
        email: (req.body.email === undefined || req.body.email === "")?  req.user.email : req.body.email,
        userName: (req.body.userName === undefined || req.body.userName === "")?  req.user.userName : req.body.userName,
        password:  req.body.password
    })
        .then(user => res.status(200).send({data:{user:user}}))
        .catch(error=> res.status(400).send({message:error.toString()}))


};

const destroy = (req,res)=>{

};


UserController = {
    index:index,
    store:store,
    show:show,
    update:update,
    destroy:destroy,
    login:login,
    logout:logout
};

module.exports = UserController;
