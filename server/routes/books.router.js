const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//sorry in advance
router.post('/', (req, res)=>{
    console.log('hi there',req.body.data);
    let book = req.body.data;
    if (book.collection === undefined) {
        pool.query(`INSERT INTO "books"("name", "date", "img_url")
        VALUES ($1, $2, $3);`, [book.name, book.date, book.img_url])
        .then((results)=>{
            res.sendStatus(201);
        })
    }else{
        pool.query(`INSERT INTO "books"("name", "date", "img_url", "collection")
        VALUES ($1, $2, $3, $4);`, [book.name, book.date, book.img_url, book.collection ])
        .then((results)=>{
            console.log('first post query successful, getting count');
            pool.query(`SELECT "count" FROM "collections" WHERE "name" = $1;`, [book.collection])
            .then((results2)=>{
                let count = results2.rows[0].count;
                count++;
                pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [book.collection])
                .then((results3)=>{
                    console.log('this crazy thing worked');
                    res.sendStatus(201);
                })
            })
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500);
        })
    }
})

router.get('/', (req, res)=>{
    console.log('hi there again');
    pool.query(`SELECT * FROM "books";`)
    .then((results)=>{
        res.send(results.rows);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

router.delete('/:id', (req, res)=>{
    console.log('hi there yet again again', req.params.id);
    pool.query(`SELECT "collection" FROM "books" WHERE "id" = $1;`, [req.params.id])
    .then((results)=>{
        if (results.rows[0].collection == 0) {
            pool.query(`DELETE FROM "books" WHERE "id" = $1;`, [req.params.id])
            .then((results4)=>{
                console.log('this crazy thing worked(2)');
                res.sendStatus(201);
            })
        }else{
            let collection = results.rows[0].collection;
            console.log('success1', collection);
            pool.query(`SELECT "count" FROM "collections" WHERE "name" = $1;`, [collection])
            .then((results2)=>{
                console.log('success2', results2.rows)
                let count = results2.rows[0].count;
                count--;
                pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [collection])
                .then((results3)=>{
                    pool.query(`DELETE FROM "books" WHERE "id" = $1;`, [req.params.id])
                    .then((results4)=>{
                        console.log('this crazy thing worked(2)');
                        res.sendStatus(201);
                    })
                })
            })
        }   
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;