const express = require("express");  //1.load the express framework module 
const articleRoutes = require ('./routes/articleRoutes') ;
const userRoutes = require ('./routes/userRoutes') ;

const app = express () ;
const PORT = 3000;
//middleware globeaux
app.use(express.json()); //parse the request body as JSON
app.use('/api/articles',articleRoutes); //mount the article routes
app.use('/api/users',userRoutes); //mount the user routes
app.get('/',(req, res)=>{
    res.json({message: 'API du Blog - Serveur Modulaire Opé rationnel ( SoC)'});
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

