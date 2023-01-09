const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [40, 'Names cannot exceed 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'This email is already registered'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
        // enum: ['user', 'admin']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


// bcrypt prior to save
userSchema.pre('save', async function( next ) {
    if ( !this.isModified( 'password' ) ) {
        next();
    }
    this.password = await bcrypt.hash( this.password, 10 );
});

// Password authenatication
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare( enteredPassword, this.password )
}

//JWT Token

userSchema.methods.getJwtToken = function() {
        return jwt.sign ({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        })
    
}
module.exports = mongoose.model('user', userSchema)