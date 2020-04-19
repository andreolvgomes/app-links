const express = require('express');
const router = express.Router();
const passport = require('passport');

// locad form sign up
//
router.get('/signup', async (req, res) => {
    res.render('auth/singup');
});

// router.post('/signup', async (req, res) => {
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });
// });

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', async (req, res) => {
    res.send('this is your profile');
});

module.exports = router;