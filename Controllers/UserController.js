const User = require('../Model/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');

exports.createUser = async(req,res)=>{
    const{name,email,password} = req.body;
    try{
        const user = new User({
            id: uuidv4(),
            name,
            email,
            password
        });
        await user.save();
        res.status(201).json("User Account Created")
    }
    catch(err){
        console.log(err);
        res.status(500).send("server error");
    }
    
}

exports.login = async(req, res) => {
     const {email, password} = req.body;
     try{
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json("Invalid Email or Password")
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json("Invalid Email or Password")
        }
        const token = jwt.sign({user_id: user._id}, 'secret_token',{expiresIn:'1w'});
        return res.status(200).json(token);
     }
     catch(err){
        console.error(err)
     }
};

