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
        .then((results)=>{//inserts the new book into the db with no collection
            res.sendStatus(201);
        })
    }else{
        pool.query(`INSERT INTO "books"("name", "date", "img_url", "collection")
        VALUES ($1, $2, $3, $4);`, [book.name, book.date, book.img_url, book.collection ])
        .then((results)=>{//inserts the new book into the db with a collection
            console.log('first post query successful, getting count');
            pool.query(`SELECT "count" FROM "collections" WHERE "name" = $1;`, [book.collection])
            .then((results2)=>{//retrieves count from collections under the specified collection name
                let count = results2.rows[0].count;
                count++;
                pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [book.collection])
                .then((results3)=>{//updates the count num and submits it to the db
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

router.put('/:id', (req, res)=>{
    let edit = req.body.data
    pool.query(`UPDATE "books" SET "name" = $1, "date" = $2, "img_url" = $3, "collection" = $4 WHERE "id" = $5;`, 
    [edit.name, edit.date, edit.img_url, edit.collection, req.params.id])
    .then((results)=>{
        console.log('success');
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})//edits a book

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
})//retrieves all books

router.delete('/:id', (req, res)=>{
    console.log('hi there yet again again', req.params.id);
    pool.query(`SELECT "collection" FROM "books" WHERE "id" = $1;`, [req.params.id])
    .then((results)=>{//checks if book is from a collection
        if (results.rows[0].collection == 0) {
            pool.query(`DELETE FROM "books" WHERE "id" = $1;`, [req.params.id])
            .then((results4)=>{//if book has no collection, do not edit any count, delete book
                console.log('this crazy thing worked(2)');
                res.sendStatus(201);
            })
        }else{
            let collection = results.rows[0].collection;
            console.log('success1', collection);
            pool.query(`SELECT "count" FROM "collections" WHERE "name" = $1;`, [collection])
            .then((results2)=>{//if book has a collection, retrieve the count from the collection
                console.log('success2', results2.rows)
                let count = results2.rows[0].count;
                count--;
                pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [collection])
                .then((results3)=>{//updates the count
                    pool.query(`DELETE FROM "books" WHERE "id" = $1;`, [req.params.id])
                    .then((results4)=>{//deletes book
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