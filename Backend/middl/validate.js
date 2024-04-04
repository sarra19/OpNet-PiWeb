const yup =require("yup");
const validate=async (req,res,next)=>{
    try{
const Schema =yup.object().shape({
    firstname: yup.string().required().matches(/^[A-Za-z]+$/, 'Name must contain only letters').min(3), 
    email:yup.string().email().required(),//require ?
    age:yup.number().required()
})
await Schema.validate(req.body)
next();  //midll
    }catch(error){  
        res.status(400).json({error: error.errors});
    }

};
module.exports =validate;