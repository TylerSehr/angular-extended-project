const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res)=>{
    console.log('getting collections');
    pool.query(`SELECT * FROM "collections";`)
    .then((results)=>{
        console.log('tada');
        res.send(results.rows);
    })
    .catch((error)=>{
        res.sendStatus(500);
    })
});

router.get('/books', (req, res)=>{
    console.log('getting collections');
    pool.query(`SELECT "name" FROM "collections";`)
    .then((results)=>{
        res.send(results.rows);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500)
    })
});

router.post('/', (req, res)=>{
    console.log('posting collection');
    pool.query(`INSERT INTO "collections" ("name") VALUES ($1);`, [req.body.collection])
    .then((results)=>{
        res.sendStatus(201);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500)
    })
})

router.delete('/:collection', (req, res)=>{
    console.log('deleting collection', req.params.collection);
    pool.query(`DELETE FROM "collections" WHERE "name" = $1;`, [req.params.collection])
    .then((results)=>{
        res.sendStatus(201)
        pool.query(`DELETE FROM "books" WHERE "collection" = $1;`, [req.params.collection])
        .then((results)=>{
            res.sendStatus(201)
        })
        .catch((error)=>{
            console.log(error);
            res.sendStatus(500)
        })
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500)
    })
})

router.get('/:collectionName', (req, res)=>{
    console.log('getting collection information', req.params.collectionName);
    pool.query(`SELECT * FROM "books" WHERE "collection" = $1;`, [req.params.collectionName])
    .then((results)=>{
        res.send(results.rows);
    })
    .catch((error)=>{
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res)=>{
    console.log('removing book from collection');
    pool.query(`SELECT * FROM "books" 
        JOIN "collections" ON "books"."collection" = "collections"."name" 
        WHERE "books"."id" = $1;`, [req.params.id])
    .then((results)=>{
        let count = results.rows[0].count;
        count--;
        pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [results.rows[0].name])
        .then((results2)=>{
            pool.query(`UPDATE "books" SET "collection" = '0' WHERE "id" = $1;`, [req.params.id])
            res.sendStatus(201);
        })
    })
    .catch((error)=>{
        res.sendStatus(500)
    })
})

router.put('/undo/:id', (req, res)=>{
    console.log('in undo');
    console.log(req.body);
        pool.query(`SELECT "count" FROM "collections" WHERE "name" =$1 `, [req.body.collection.collection])
        .then((results)=>{
            let count = results.rows[0].count;
            count++
            pool.query(`UPDATE "collections" SET "count" = ${count} WHERE "name" = $1;`, [req.body.collection.collection])
            .then((results2)=>{
                pool.query(`UPDATE "books" SET "collection" = $1 WHERE "id" = $2;`, [req.body.collection.collection, req.params.id])
                res.sendStatus(201);
            })
        .catch((error)=>{
            res.sendStatus(500)
            console.log(error); 
        })
    })
})


module.exports = router;

