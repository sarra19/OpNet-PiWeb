const yup =require("yup");
const validate=async (req,res,next)=>{
    try{
const Schema =yup.object().shape({
//     firstname: yup.string().required().matches(/^[A-Za-z]+$/, 'Name must contain only letters').min(3), 
//     lastname: yup.string().required().matches(/^[A-Za-z]+$/, 'Name must contain only letters').min(3), 
//     email:yup.string().email().required(),//require ?
//   // dateOfBirth: yup.string().required().trim().matches(/^\d{2}-\d{2}-\d{4}$/, 'Date of Birth must be in format DD-MM-YYYY'),
})
await Schema.validate(req.body)
next();  //midll
    }catch(error){  
        res.status(400).json({error: error.errors});
    }

};
module.exports =validate;