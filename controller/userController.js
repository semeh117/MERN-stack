const User = require('../models/useModels');
 //Create a new user

 const createUser = async(req,res)=>{
    try{
        const {name,email,age,role}=req.body;
        if(!name||!email){
            return res.status(400).json({message:'Name and email are required'});
        }
        //check duplicate
        const exists = await User.findOne({email});
        if (exists){
            return res.status(409).json({message:'Email already in use'});
        }
        const user =await User.create({name,email,age,role});
        res.status(200).json(user);
    } catch(err){
        res.status(500).json({message:'err.message'});
    };
//Get all user
const getUsers = async(req,res)=>{
   try {
    const users =await User.find();
    if(!users){
        return res.status(404).json(users);
    }
    res.status(200).json(user);
   }catch (err){
    res.status(500).json({message : err.message});
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
        res.status(500).json({message: err.message});
    }
}
};
module.exports ={createUser,getUsers,getUsersById};

