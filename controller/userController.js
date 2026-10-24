const User = require('../models/userModels');
 //Create a new user

 const createUser = async(req,res)=>{
    try{
        const {name,email,age,role,bio,phone}=req.body;
        if(!name||!email){
            return res.status(400).json({message:'Name and email are required'});
        }
        //check duplicate
        const exists = await User.findOne({email});
        if (exists){
            return res.status(409).json({message:'Email already in use'});
        }
        const user =await User.create({name,email,age,role,bio,phone});
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message:err.message});
    };
};
//Get all user
const getUsers = async(req,res)=>{
    try {
        const users =await User.find();
        res.status(200).json(users);

    }catch(err){
        res.status(500).json({message : err.message})
    }
};
  


//get byid 
const getUsersById= async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if (!user){
            return res.status(404).json(user)
        }
        res.status(200).json(user);
    }catch(err){
        if (err.name==='CastError'){
            return res.status(400).json({message:'Invalid resource identifier (ObjectId expected)'})
        }
        res.status(500).json({message: err.message});
    }
};
const DeleteUser =async(req,res)=>{
    try{
        const user =await User.findByIdAndDelete(req.params.id);
        if (!user){
            return res.status(400).json ({message : 'User not found for deletion'});
        }
        res.status(200).json({message :'User deleted',id: req.params.id});
    }catch(err){
        if (err.name==='CastError'){
            return res.status(400).json({message:'Invalid resource identifier (ObjectId expected)'});
        }
        res.status(500).json({mesage:err.mesage});
    
    }

};
module.exports ={createUser,getUsers,getUsersById,DeleteUser};

