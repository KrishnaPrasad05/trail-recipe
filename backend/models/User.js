const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    profilePic: { type: String },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // Remove confirmPassword from the schema
    confirmPassword: { type: String, required: true }
});

// Pre-save middleware to hash the password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
