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

    // go to router links
    res.redirect('/links');
});

// list all links
//
router.get('/', async (req, res) => {
    const links = await pool.query('select * from links');
    res.render('links/list', { links: links });
});

// delete link
//
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('delete from links where id = ?', [id]);

    // go to router links
    res.redirect('/links');
});

module.exports = router;