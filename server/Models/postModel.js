const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    socialMediaAccount: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SocialMediaAccount',
    },
    content: { 
      type: String, 
      required: true
    },
    platform: {
      type: String,
      required: true
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    scheduledAt: { 
      type: Date, 
      required: true 
    },
    published: {
      type: Boolean,
      default: false,
    },
  }, 
  { 
    timestamps: true 
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
