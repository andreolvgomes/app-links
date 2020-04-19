const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

// add new link
//
router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLInk = {
        title,
        url,
        description
    };
    await pool.query('insert into links set ?', [newLInk]);

    res.send('received');
});

module.exports = router;