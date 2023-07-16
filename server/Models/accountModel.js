const mongoose = require('mongoose');


const socialMediaAccountSchema = mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
    platform: String,
    accessToken: String,
  }, 
  { 
    timestamps: true 
  }
);

const SocialMediaAccount = mongoose.model('SocialMediaAccount', socialMediaAccountSchema);

module.exports = SocialMediaAccount;
