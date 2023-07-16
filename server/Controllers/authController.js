const User = require("../Models/userModel");
const SocialMediaAccount = require("../Models/accountModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");




//@desc JWT token
const createToken = (userId) => {
    const jwtKey = process.env.JWT_SECRET;
    return jwt.sign({ userId }, jwtKey, { expiresIn: "1d" });
};

//@desc validate the register input
const validateRegisterInput = ({ username, email, password }) => {
    if (!username || !email || !password) {
        throw new Error("Please provide all fields");
    }
    if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
    }
    
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }
};

//@desc validate the login input
const validateLoginInput = ({ email, password }) => {
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Invalid email address");
    }
};

//@desc Register new User
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //validate input data
        validateRegisterInput({ username, email, password });
    

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            throw new Error("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};



//@desc Authenticate User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Validate input
        validateLoginInput({ email, password });

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Compare the provided password with the stored password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid credentials");
        }

        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.username, token});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@desc verify if the user has a social media accounts 
const userSocialMediaAccount = async (req, res) => {
    try {
        
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error("User not found");
        }
        
        const userAccount = await SocialMediaAccount.findOne(
            { user: userId }
        );
        
        if (userAccount && userAccount.user.toString() === userId) {
            res.status(201).json(userAccount);
        } else {
            res.status(400).json({ message: "User hasn't integrated with Facebook" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    userSocialMediaAccount
}