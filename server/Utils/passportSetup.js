const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../Models/userModel');
const SocialMediaAccount = require('../Models/accountModel')
const express = require('express');
const router = express.Router();
require('dotenv').config();
const CLIENT_URL = "http://localhost:3000/platforms"

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'picture.type(large)', 'emails']
        },
        async function (accessToken, refreshToken, profile, callback) {
            try {
            
                const user = await User.findOne({ email: profile.emails[0].value });
                if (!user) {
                    console.log('User does not exist in the database');
                    return callback(null, false, { message: 'User does not exist in the database' });
                }
                
                const existingSocialMediaAccount = await SocialMediaAccount.findOne({
                    user: user._id,
                    platform: 'facebook'
                });

                if (existingSocialMediaAccount) {
                    console.log('User already has a Facebook account associated');
                    return callback(null, false, { message: 'Facebook account already exists' });
                }
                
                
                const socialMediaAccount = new SocialMediaAccount({
                    user: user._id,
                    platform: 'facebook',
                    accessToken
                });
        
                
                await socialMediaAccount.save();
        
                return callback(null, profile);

            } catch (error) {
                console.error('Error during Facebook authentication:', error);
                return callback(error, false);
            }
        }
    )
);

router.get('/', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));


router.get(
    '/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook/error',
    }),
    (req, res) => {
        if (req.user) {
            // Successful authentication
            res.redirect(`${CLIENT_URL}?success=true`);
        } else {
            // Unsuccessful authentication
            res.redirect(`${CLIENT_URL}?success=false`);
        }
    }
);




router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));



module.exports = router;
