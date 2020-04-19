const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

// add new link
//
router.post('/add', isLoggedIn, async(req, res) => {
    const { title, url, description } = req.body;
    const newLInk = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('insert into links set ?', [newLInk]);

    //display message
    req.flash('success', 'Link saved successfully');

    // go to router links
    res.redirect('/links');
});

// list all links
//
router.get('/', isLoggedIn, async(req, res) => {
    const links = await pool.query('select * from links where user_id = ?', [req.user.id]);
    res.render('links/list', { links: links });
});

// delete link
//
router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('delete from links where id = ?', [id]);

    //display message
    req.flash('success', 'Link removed successfully');

    // go to router links
    res.redirect('/links');
});

// get one link to edit
//
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('select * from links where id = ?', [id]);

    // go to router links
    res.render('links/edit', { link: links[0] });
});

// update link
//
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLInk = {
        title,
        url,
        description
    };
    await pool.query('update links set ? where id = ?', [newLInk, id]);

    //display message
    req.flash('success', 'Link updated successfully');

    // go to router links
    res.redirect('/links');
});

module.exports = router;