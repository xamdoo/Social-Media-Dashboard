const express = require('express');

const router = express.Router();

const postController = require('../Controllers/postController');


router.post('/publish', async (req, res) => {
    try {
        await postController.publishPosts(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/scheduled/:id', postController.retrieveScheduledPosts)
router.get('/:id', postController.getPost)
router.put('/update/:postId', postController.updatePost);
router.delete('/delete/:postId', postController.deletePost);

module.exports = router;
