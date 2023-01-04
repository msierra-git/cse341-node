const routes = require('express').Router();

routes.get('/', (req, res) => {
   res.send('Hello, A. Michael Sierra!')
})

module.exports = routes;