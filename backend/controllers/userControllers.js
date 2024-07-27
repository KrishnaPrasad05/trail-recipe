const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.addUser = async(req,res)=>{
    try{
        const {name,dob,email,password,phoneNumber,profilePic,confirmPassword} = req.body;
        if(!name || !dob || !email || !password || !phoneNumber || !profilePic || !confirmPassword){
            return res.status(500).json({message:"Please fill all the fields"})
        }

        const existingUser = await User.findOne({$and:[{phoneNumber:phoneNumber},{email:email}]})

        if(existingUser){
            return res.status(500).json({message:'User already exists'})
        }

        const newUser = new User({
            name,
            dob,
            email,
            dob,
            password,
            phoneNumber,
            profilePic,
            confirmPassword
        })
        const savedUser = await newUser.save()
        res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.getUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.getUsers = async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id)
        res.status(200).send()
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.updateUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:'Internal server error'})
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.query; // Use req.body instead of req.query for secure login
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');
        const identity = user.id
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json([identity,token]);
    } catch (err) {
        res.status(500).send('Server error');
    }
};
  
exports.protected = (req, res) => {
    res.send('This is a protected route');
};
exports.profile = (req, res) => {
    res.send('This is a protected route');
};




exports.forgotPassword = async (req, res) => {
    const { dob, phoneNumber, newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ dob, phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newPassword) {
            user.password = newPassword;
            user.confirmPassword = confirmPassword;
        }

        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


 