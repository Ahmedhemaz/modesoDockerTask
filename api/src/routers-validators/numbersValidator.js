const isNumber = (value,res)=>{
    if(isNaN(value)){
        return res.status(406).send({
            message: 'Not Acceptable , id must be a Number'
        })
    }
};


module.exports = isNumber;
