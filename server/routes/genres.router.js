const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//require all ur schemas
router.get('/', (req, res)=>{
    console.log('koala.router.js is working');
    res.send(/*something*/)
});
router.post('/', (req, res)=>{
    //whatever the post does
    res.sendStatus(201);
})





module.exports = router;