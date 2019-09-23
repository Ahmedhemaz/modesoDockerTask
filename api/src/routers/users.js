const express = require('express');
const RouterValidatorFactory = require('../routers-validators/validatorsFactory');
const router = new express.Router();
const UserController = require('../controllers/usersController');
const auth = require('../middleware/auth');

router.get("/api/v1/users",(req,res)=>{
   console.log("HelloUSer") ;
});

// register new user
router.post("/api/v1/users",(req,res)=>{
    UserController.store(req,res);
});

// login
router.post('/api/v1/users/login',(req,res)=>{
    UserController.login(req,res)
});

// show my profile data
router.get('/api/v1/users/me',auth,(req,res)=>{
    UserController.index(req,res);
});

// show User Notes, if he is the author will show all notes , if not will show public only
router.get('/api/v1/users/:id/notes',auth,(req,res)=>{
    return (RouterValidatorFactory.isNumber(req.params.id,res)) ? false :UserController.show(req,res);
});

// Authenticated user edit profile
router.put('/api/v1/users/edit',auth,(req,res)=>{
   UserController.update(req,res);
});

// Authenticated user logout
router.post('/api/v1/users/logout',auth,(req,res)=>{
    UserController.logout(req,res);
});


module.exports = router;
