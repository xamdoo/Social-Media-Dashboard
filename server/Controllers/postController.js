const Post = require('../Models/postModel');
const SocialMediaAccount = require('../Models/accountModel')
const axios = require('axios')
require('dotenv').config();
const cloudinary = require('../Utils/cloudinary')



//@desc Function to check if the current time matches the scheduled time
const isScheduledTime = (scheduledAt) => {
    const now = new Date();
    const scheduledTime = new Date(scheduledAt);

    return now.getTime() >= scheduledTime.getTime();
};

//@desc Function to publish a post on Facebook
const publishPostOnFacebook = async (post) => {
    
    try {
        const { _id, content, image } = post;
        const pageId = process.env.PAGE_ID;
        const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
        const message = content;
    
        
        let url = `https://graph.facebook.com/${pageId}/feed?`;
        
        let params = {
            message,
            access_token: pageAccessToken,
        };

        if (image && image.url) {
            url = `https://graph.facebook.com/${pageId}/photos?`;
            params.url = post.image.url;
        }
        const response = await axios.post(url, null, { params });
        console.log('Post Id:', response.data.id);
    
        // Update the post's published field to true
        await Post.findByIdAndUpdate(_id, { published: true });
    
    } catch (error) {
        console.log('Error occurred while publishing post:', error.response);
    }
};

//@desc Function to retrieve data from Database to check time
const retrieveAndPublishPosts = async () => {
    try {
        
        const scheduledPosts = await Post.find({ published: false });

        for (const post of scheduledPosts) {
            
            const { scheduledAt } = post;
    
            // Check if the current time is past the scheduled time
            if (isScheduledTime(scheduledAt)) {
                await publishPostOnFacebook(post);
            }
        }
    } catch (error) {
        console.log('Error occurred while retrieving posts:', error);
    }
};


//desc Function to publish the scheduled post
const publishPosts = async (req, res) => {
    
    try {
        const { user, platform, content, scheduledAt } = req.body;
    
        if (!user) {
            return res.status(500).json({ message: "User not found" });
        }
    
        if (!platform || !content || !scheduledAt) {
            return res.status(400).json({ message: "Please provide all required fields"});
        }

        let image = null;

        if (req.body.image) {
            const result = await cloudinary.uploader.upload(
                `data:image/jpeg;base64,${req.body.image}`, {
                    folder: "FB_POSTS",
                }
            );
            image = {
                public_id: result.public_id,
                url: result.url,
            };
        }
    
        const socialMediaAccount = await SocialMediaAccount.findOne({
            user,
            platform,
        });
    
        if (!socialMediaAccount) {
            throw new Error(`Social media account for platform ${platform} not found.`);
        }
    
        // Save the post to the database
        const post = new Post({
            user,
            socialMediaAccount: socialMediaAccount._id,
            platform,
            content,
            scheduledAt: new Date(scheduledAt),
            image,
        });
    
        await post.save();
    
        res.status(200).json(post);
    
        // Start the scheduler to check and publish posts
        retrieveAndPublishPosts();
    } catch (error) {
        console.log(error.response);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//desc Function to retrieve All scheduled posts
const retrieveScheduledPosts = async (req, res) => {
    try {
        
        const userId = req.params.id;
        const scheduledPosts = await Post.find({ user: userId, published: false });
    
        res.status(200).json(scheduledPosts)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//desc Function to update the scheduled post
const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, scheduledAt, platform } = req.body;

        if (!platform || !content || !scheduledAt) {
            return res.status(400).json({ message: "Please provide all required fields"});
        }
    
        let update = {
            content,
            scheduledAt,
            platform
        };
    
        if (req.body.image) {
            const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${req.body.image}`,
                {
                    folder: "FB_POSTS",
                }
            );
            update.image = {
                public_id: result.public_id,
                url: result.url,
            };
        }
    
        const post = await Post.findByIdAndUpdate(postId, update, { new: true });
    
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
    
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//desc Function to delete a scheduled post
const deletePost = async(req, res) => {
    try {
        const { postId }= req.params;
        
        await Post.findByIdAndDelete({ _id: postId });
    
        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//@desc Function to retrieve one particular post
const getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    publishPosts,
    updatePost,
    deletePost,
    retrieveAndPublishPosts,
    retrieveScheduledPosts,
    getPost
}