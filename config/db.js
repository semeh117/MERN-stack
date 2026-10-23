const mongosse= require('mongoose');

async function connectDB(uri){
    if(!uri){
        throw new Error('MongoDB URI is not defined in the environment variables (.env)');

    }
    await mongosse.connect(uri,{
        autoIndex:true, //automatically builds indexes (e.g.unique in dev)
    });
    console.log('MongoDB Atlas connected successfully');
}

module.exports = connectDB;