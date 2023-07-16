const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    accountId: String,
    username: String,
    email: { 
      type: String, 
      unique: true
    },
    password: String,
    photoURL: String,
    
  },
  {
    timestamps: true 
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User;
