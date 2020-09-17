const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')
require('dotenv').config()

    newsRouter.get('', async (req, res) => {
        try {
            const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`)
            // let { articles } = newsAPI.data
            res.render('news', { articles: newsAPI.data })
        } catch (err) {
            if (err.response) {
                // the request went through and a response was returned
                // status code in 3xx / 4xx / 5xx range
                res.render('news', { articles: null })
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
    })

    newsRouter.get('/:id', async (req, res) => {
        let articleID = req.params.id
        try {
            const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleID}`)
            // console.log(newsAPI.data)
            res.render('newsSingle', { article: newsAPI.data })
        } catch (err) {
            if (err.response) {
                // the request went through and a response was returned
                // status code in 3xx / 4xx / 5xx range
                res.render('newsSingle', { article: null })
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
    })

    newsRouter.post('', async (req, res) => {
        let search = req.body.search
        try {
            const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
            console.log(newsAPI.data)
            res.render('newsSearch', { articles: newsAPI.data })
        } catch (err) {
            if (err.response) {
                // the request went through and a response was returned
                // status code in 3xx / 4xx / 5xx range
                res.render('newsSearch', { articles: null })
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
    })

module.exports = newsRouter