const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
//require all ur schemas
router.get('/', (req, res)=>{
    console.log('koala.router.js is working');
    res.send(/*something*/)
});


router.post('/', (req, res)=>{
    console.log('hi there',req.body.data);
    let book = req.body.data;
    pool.query(`INSERT INTO "books"("name", "date", "img_url", "genre")
    VALUES ($1, $2, $3, $4);`, [book.name, book.date, book.img_url, book.genre ])
    .then((results)=>{
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})





module.exports = router;