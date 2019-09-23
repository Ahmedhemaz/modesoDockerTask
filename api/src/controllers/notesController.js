const Note = require('../models').Note;
const fs = require('fs');

// get authenticated user notes
const index = (req,res)=>{
    return Note
        .findAll({
            where:{
                userId:req.user.id
            }
        })
        .then(notes=>{
            if(notes === undefined){
               return  res.status(204).send({
                   message:"No Content"
               })
            }
            res.status(200).send({data:{notes:notes}})
        } )
        .catch(error=> res.status(400).send({message:"Bad Request"}))

};

// let authenticated user to make a note and assign it to him
const store = (req,res)=>{
    return Note
        .create({
            title: req.body.title,
            content: req.body.content,
            image: (req.file)? req.file.path : undefined,
            userId: req.user.id,
            public: req.body.public // default is true
        })
        .then(note => res.status(201).send({data:{note:note}}))
        .catch(error => res.status(400).send({message:(error.errors[0].message)?error.errors[0].message:"Bad Request"}));

};

//todo create helper function to find object to use it in show,update and destroy instead of duplicate code


// show certain note with id and if it's not public and he is not the author will return status code 401
const show = (req,res)=>{
    Note.findOne({where:{
            id: req.params.id
        }})
        .then(note=>{
            if(!note){
                return res.status(404).send({
                    message: 'Not Found!'
                })
            }
            if (note.public === false && req.user.id !== note.userId){
                return res.status(401).send({
                    message: 'not Authorized'
                })
            }
            return  res.status(200).send({data:{note:note}})
        })
        .catch(error => res.status(400).send({message:"Bad Request"}))
};

// edit certain note and if the authenticated user is not the author will return 401 code
const update = (req,res)=>{
    Note.findOne({where:{
            id: req.params.id
        }})
        .then(note=>{
            if(!note){
                return res.status(404).send({
                    message: 'Not Found!'
                })
            }
            if (note.userId !== req.user.id){
                return res.status(401).send({
                    message: 'not Authorized'
                })
            }
            return  note
                .update({
                    title: req.body.title || note.title, // will take the old value if there is no new values
                    content: req.body.content || note.content,
                    image: (req.file)? req.file.path : note.image, // if there is no image will take the old image path
                    public: req.body.public || note.public
                })
                .then(() => res.status(200).send({data:note,message:"resource updated successfully"}))
                .catch(error=> res.status(400).send({message:"Bad Request"}))
        })
        .catch(error => res.status(400).send({message:"Bad Request"}))
};

// delete note and if the authenticated user is not the author will return 401 code
const destroy = (req,res)=>{
    Note.findOne({where:{
            id: req.params.id
        }})
        .then(note=>{
            if(!note){
                return res.status(404).send({
                    message: 'Not Found!'
                })
            }
            if (note.userId !== req.user.id){
                return res.status(401).send({
                    message: 'not Authorized'
                })
            }
            return  note.destroy()
                .then(() => res.status(200).send({message:"resource deleted successfully"}))
                .catch(error=> res.status(400).send({message:"Bad Request"}))
        })
        .catch(error => res.status(400).send({message:"Bad Request"}))

};

// retrieve note image
const retrieveImage = (req,res)=>{
    Note.findOne({where:{
            id: req.params.id
        }})
        .then(note=>{
            if(!note.image){
                return res.status(404).send({
                    message: 'Not Found!'
                })
            }
            res.setHeader('Content-Type', note.image.split('.',2)[1]); // get the extension of img
            fs.createReadStream(note.image).pipe(res); // upload it using read stream
        })
        .catch(error => res.status(400).send({message:"Bad Request"}))
};

NoteController = {
    index:index,
    store:store,
    show:show,
    update:update,
    destroy:destroy,
    retrieveImage:retrieveImage
};

module.exports = NoteController;
