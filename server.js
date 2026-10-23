const express = require("express");  //1.load the express framework module 
const dotenv = require("dotenv"); //2.load the dotenv module to read environment variables from .env file
const connectDB = require("./config/db"); //3.load the connectDB function from db.js to connect to MongoDB Atlas
const articleRoutes = require ('./routes/articleRoutes') ;
const userRoutes = require ('./routes/userRoutes') ;
dotenv.config(); //4.load the environment variables from .env file
const PORT = process.env.PORT || 3000;
const app = express () ;

//middleware globeaux
app.use(express.json()); //parse the request body as JSON
app.use('/api/articles',articleRoutes); //mount the article routes
app.use('/api/users',userRoutes); //mount the user routes

// Asynchronously connect to MongoDB Atlas before listening
( async () => {
    try {
        await connectDB(process.env.MONGODB_URI); //connect to MongoDB Atlas using the URI from .env file
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        process.exit(1); // Exit the process with an error code
    }
})();



