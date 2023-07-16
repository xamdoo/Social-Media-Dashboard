const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session');
const cron = require('node-cron');

dotenv.config();
const app = express();

//Middleware
app.use(express.json({ limit: "3000mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//Session management
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
    })
);

//Passport setup
const passportSetup = require('./Utils/passportSetup');
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/facebook', passportSetup);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (id, cb) {
    return cb(null, id);
});

//Routes
const authRoutes = require('./Routers/authRoutes');
const postRoutes = require('./Routers/postRoutes');
app.use('/post', postRoutes)
app.use('/auth', authRoutes);

const { retrieveAndPublishPosts } = require('./Controllers/postController');

//Database Connection
const PORT = process.env.PORT || 7000;
const db = process.env.MONGO_URI;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to the database'))
.catch((err) => console.error('Database connection error:', err));


//Server Start
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);

    // Retrieves and publishes scheduled posts when the server starts
    await retrieveAndPublishPosts();
    
    cron.schedule('* * * * *', async () => {
        await retrieveAndPublishPosts();
    });
});
