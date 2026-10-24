const express = require('express');
const router = express.Router();
const {getAllArticles,getArticleById,createArticle,updateArticle,deleteArticle}= require('../controller/articleController');
const {protect} = require('../Middlaweres/authMiddleware');

//public read routes 
router.get('/',getAllArticles);
router.get('/',getArticleById);
router.post('/',protect, createArticle);
router.put('/:id',protect, updateArticle);
router.delete('/:id',protect, deleteArticle);

module.exports = router;