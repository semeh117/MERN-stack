const articles = [
    {id:1, title:'Welcome to the blog ', author :'Admin'},
    {id:2, title:'My first Express server ', author :'Aya'},
    {id:3, title:'Testing an API with Postman', author :'Aya'}
];
let nextId = 4;

const getAllarticles = (req, res) => {
    const {author} = req.query;
    let result = articles;
    if (author){
        result = articles.filter((article) => article.author === author);
    }
    res.json({total: result.length, articles: result});
}

const getArticleById = (req, res) => {
    const {id} = req.params;
    const article = articles.find((article) => article.id === parseInt(id));

    if (article){
        res.json(article);
    }
    else{
        res.status(404).json({message:`Article with id ${id} not found`});
    }
}

const createArticle = (req, res) => {
    const {title, author} = req.body;
    if (!title || !author){
        return res.status(400).json({error:"Title and author are required"});
    }
    const newArticle = {id: nextId, title, author};
    nextId = nextId + 1;
    articles.push(newArticle);
    res.status(201).json({message:"Article created successfully", article:newArticle});
}

const updateArticle = (req, res) => {
    const id = Number(req.params.id);
    const {title, author} = req.body;

    const index = articles.findIndex((article) => article.id === id);
    if (index === -1)
        return res.status(404).json({message:`Article with id ${id} not found`});

    if (title) articles[index].title = title;
    if (author) articles[index].author = author;

    res.status(200).json({message:"Article updated successfully", article:articles[index]});
}

const deleteArticle = (req, res) => {
    const id = Number(req.params.id);
    const articlesExiste = articles.some(a => a.id === id);
    if (!articlesExiste) {
        return res.status(404).json({error:`Impossible de supprimer : article ${id} introuvable`});
    }
    const index = articles.findIndex(a => a.id === id);
    articles.splice(index, 1);
    res.status(200).json({message:`Article with id ${id} deleted successfully`});
};

module.exports = {
    getAllarticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};