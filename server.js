const express = require("express");  //1.load the express framework module 

const app = express(); //2. innstantiate the server application 
const PORT = 3000;
app.use(express.json()); //middleware to parse incoming JSON requests

//3. route definition :executed when a client requests GET /
app.get("/", (req, res) => {
    res.json({ message: "Hello, I am the blog API!" });
 });
 
// In- memory data store .state resets to defaults upon process restart 
// Persistant storage will be handeled by MongoDB 
const articles = [
    {id:1, title:'Welcome to the blog ', author :'Admin'},
    {id:2, title:'My first Express server ', author :'Aya'},
    {id:3, title:'Testing an API with Postman', author :'Aya'}
];
//GET/api/articles/:id -> fetch article by id
app.get("/api/articles/:id", (req, res) => {
    const {id} = req.params;
    const article = articles.find((article) => article.id === parseInt(id));        

    if (article){
        res.json(article);
    }
    else{
        res.status(404).json({message:`Article with id ${id} not found`});
    }
});
//GET/api/articles/search?author=Aya -> fetch articles by author
app.get("/api/articles", (req, res) => {
    const {author} = req.query;
    let result = articles;
    if (author){
        result = articles.filter((article) => article.author === author);
    }
    res.json({total: result.length, articles: result});
   
});

//POST/api/articles -> create a new article
let nextId = 4; //next id to be assigned to a new article
app.post("/api/articles", (req, res) => {
    const {title, author} = req.body;
    if (!title || !author){
        return res.status(400).json({error:"Title and author are required"});
    }
    const newArticle = {id: nextId, title, author};
    nextId= nextId + 1;
    articles.push(newArticle);
    res.status(201).json({message:"Article created successfully", article:newArticle});
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
