const users = [
    {id:1, name:'admin ', email :'Admin@gmail.com',role :'admin'},
    {id:2, name:'Aya ', email :'Aya@gmail.com',role :'user'},
    {id:3, name:'Aya', email :'Aya@gmail.com',role :'user'}
];
const {estNonValide, estEmailValide} = require('../utils/validators');

let nextId =4;
const getAllusers =(req,res)=>{
    const {name} = req.query;
    let result = users;
    if (name){
        result = users.filter((user) => user.name === name);
    }
    res.json({total: result.length, users: result});
   
}
const getUserById =(req,res)=>{
    const {id} = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (user){
        res.json(user);}
    else
        return res.status(404).json({message:`User with id ${id} not found`});
}
const createUser =(req,res)=>{
    const {name, email, role} = req.body;
    if (!name || !email || !role){
        return res.status(400).json({error:"Name, email and role are required"});
    }
    if (!estNonValide(name) || !estEmailValide(email) || !estNonValide(role)){
        return res.status(400).json({error:"Invalid name, email or role"});
    }
    const newUser = {id: nextId, name, email, role};
    nextId= nextId + 1;
    users.push(newUser);
    res.status(201).json({message:"User created successfully", user:newUser});
}

const DeleteUser =(req,res)=>{
    const {id} = Number(req.params.id);
    const UserExiste = users.some(u =>u.id===id)
    if (!UserExiste) {
        return res.status(404).json ({error:'Impossiblede suprimer :user :{id} introvable'});
    }
    users =users.filter(u => u.id !== id);
    res.status(200).json({message:`User with id ${id} deleted successfully`});
};

const updateUser =(req,res)=>{
    const {id}= Number(req.params.id);
    const {name, email, role} = req.body;

    const index = users.findIndex((user) => user.id === id);
    if (index ===-1)
        return res.status(404).json({message:`User with id ${id} not found`});

    if (name) users[index].name = name;
    if (email) users[index].email = email;
    if (role) users[index].role = role;

    res.status(200).json({message:"User updated successfully", user:users[index]});
}
module.exports = {
    getAllusers,
    getUserById,
    createUser,
    DeleteUser,
    updateUser
};