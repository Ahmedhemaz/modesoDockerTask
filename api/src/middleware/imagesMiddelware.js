const multer = require('multer');

const fileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        return cb(new Error('IMAGE_FORMAT'),false)
    }
    cb(undefined,true);
};
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./public/images/notes');
    },
    filename: (req,file,cb)=>{
        cb(null,+ Date.now()+"-"+file.originalname);
    }
});
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5mb limit size
    },
    fileFilter:fileFilter
});

const notesImageMiddleware = upload.single('image');


module.exports = notesImageMiddleware;
