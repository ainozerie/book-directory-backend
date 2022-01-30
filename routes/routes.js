const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

let storageData = [];

const storagePath = path.join(path.resolve('./'), 'data/storage.json');

router.get('/', (req, res) => {
    res.send('Main page');
    res.end;
});
router.get('/all', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
    storageData = JSON.parse(content);
    res.send(storageData);
    res.end;
    });
});
router.get('/custom', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        storageData = JSON.parse(content);
        const filteredData = storageData.filter(item => {
            if (item.name.toLowerCase().includes(req.body.search)) return item;
            if (item.author.toLowerCase().includes(req.body.search)) return item;
        });
        res.send(filteredData);
        res.end;
    });
});
router.post('/', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        storageData = JSON.parse(content);
        storageData.push(req.body);
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
        storageData.push(req.body);
        fs.writeFile(storagePath, JSON.stringify(storageData), (err) => {
            if (err) console.log(err);
            res.send('successfilly updated');
            res.end;
        });
    });
});
router.delete('/', (req, res) => {
    fs.readFile(storagePath, (err, content) => {
        if (err) console.log(err);
        storageData = JSON.parse(content);
        storageData.push(req.body);
        const newStorageData = storageData.filter(item => {
            if (!item.name.toLowerCase().includes(req.body.name) && !item.author.toLowerCase().includes(req.body.author)) return item;
        });
        fs.writeFile(storagePath, JSON.stringify(newStorageData), (err) => {
            if (err) console.log(err);
            res.send('successfully deleted');
            res.end;
        });
    });
});

module.exports = router;
