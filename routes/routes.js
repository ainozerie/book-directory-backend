const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

let storageData;

const storagePath = path.join(path.resolve('./'), 'data/storage.json');

// router.get('/', (req, res) => {
//     res.send('Main page');
//     res.end;
// });
router.get('/all', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
    storageData = JSON.parse(content);
    res.send(storageData);
    res.end;
    });
});
router.get('/:search', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        console.log(req.params.search)
        if (err) console.log(err);
        requestId = req.params.search.toString();
        storageData = JSON.parse(content);
        console.log(storageData[requestId])
        if (storageData[requestId] !== undefined) {
            res.send(storageData[requestId]);
            res.end;
        } else {
            res.send('not found');
            res.end;
        }
    });
});
router.post('/', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        console.log(req.body);
        storageData = JSON.parse(content);
        const bookId = Math.floor(100000 + Math.random() * 900000);
        storageData[bookId] = req.body;
        fs.writeFile(storagePath, JSON.stringify(storageData), (err) => {
            if (err) console.log(err);
            res.send('successfully added');
            res.end;
        });
    });
});
router.put('/', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        storageData = JSON.parse(content);
        storageData[req.body.bookId] = {'name': req.body.name, 'author': req.body.author};
        fs.writeFile(storagePath, JSON.stringify(storageData), (err) => {
            if (err) console.log(err);
            res.send('successfully updated');
            res.end;
        });
    });
});
router.delete('/:bookId', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        storageData = JSON.parse(content);
        console.log(req.body);
        delete storageData[req.params.bookId];
        fs.writeFile(storagePath, JSON.stringify(storageData), (err) => {
            if (err) console.log(err);
            res.send('successfully deleted');
            res.end;
        });
    });
});


module.exports = router;
