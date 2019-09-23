const express = require('express');
const RouterValidatorFactory = require('../routers-validators/validatorsFactory');
const router = new express.Router();
const notesController = require('../controllers/notesController');
const notesImageMiddleware = require('../middleware/imagesMiddelware');
const auth = require('../middleware/auth');

// get all authenticated user notes url
router.get('/api/v1/notes',auth,(req,res)=>{
    notesController.index(req,res);
});

// create new note url
router.post('/api/v1/notes',auth,(req,res)=>{
    notesImageMiddleware(req,res,(error)=>{
        if (error) {
            return res.status(415).send({message: "image must be png,jpg,jpeg and 0~5mb"});
        }
        notesController.store(req,res);
    });
});

// show note with id
router.get('/api/v1/notes/:id',auth,(req,res)=>{
    // check if the id is number if true will get the note if not will return status 406 not acceptable parameter
    return (RouterValidatorFactory.isNumber(req.params.id,res)) ? false : notesController.show(req,res) ;
});
// update note with id
router.put('/api/v1/notes/:id',auth,(req,res)=>{
    notesImageMiddleware(req,res,(error)=>{
        if (error) {
            return res.status(415).send({message: "image must be png,jpg,jpeg and 0~5mb"});
        }
        return (RouterValidatorFactory.isNumber(req.params.id,res)) ? false : notesController.update(req,res) ;

    });
});
// delete note with id
router.delete('/api/v1/notes/:id',auth,(req,res)=>{
    return (RouterValidatorFactory.isNumber(req.params.id,res)) ? false : notesController.destroy(req,res) ;
});
// get note image from server
router.get('/api/v1/notes/:id/image',(req,res)=>{
    return (RouterValidatorFactory.isNumber(req.params.id,res)) ? false : notesController.retrieveImage(req,res) ;
});

module.exports = router;
