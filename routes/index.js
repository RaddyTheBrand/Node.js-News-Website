const express = require('express')
const router = express.Router()
const axios = require('axios')
require('dotenv').config()

let newsObject = {}
article = ''

// Display News
const listNews = async () => {
    try {
        const res = await axios.get(`http://newsapi.org/v2/everything?q=node.js&language=en&sortBy=publishedAt&apiKey=${process.env.API_KEY}`)
        newsObject = res.data
    } catch (err) {
        if (err.response) {
            // the request went through and a response was returned
            // status code in 3xx / 4xx / 5xx range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            // request was made but server returned no response
            console.log(err.request);
        } else {
            // something went wrong in setting up the request
            console.error('Error:', err.message);
        }
    }
}


listNews()

// Router
router.get('', async (req, res) => {
  

    if( newsObject.status === "error") {
        res.render('index', { articles: null })
    } else {
        res.render('index', { articles: newsObject.articles })
    } 
})

router.get('/:id', async (req, res) => {
    let articleId = req.params.id
    // res.send( newsObject.articles[articleId] )
    res.render('index', { articles: null, article: newsObject.articles[articleId] })
})


router.post('', async (req, res) => {
    let search = req.body.search
    
    if( newsObject.status === "error") {
        res.render('index', { articles: null })
    } else {
        res.render('index', { articles: newsObject.articles })
    } 

    listNews(search)
})


module.exports = router