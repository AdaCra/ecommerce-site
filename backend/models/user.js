const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

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
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ]
        }
    },
    suspension:{
        status:{
            type: String,
            default: 'Active',
            enum: {
                values: [
                    'Active',
                    'Suspended'
                ]
            }
        },
        reason:{
            type: String,
            default: 'Account is Active',
            enum:{
                values: [
                    'Account is Active',
                    'Inactivity',
                    'Suspicious Activity',
                    'Contravention of T&C´s',
                    'Fraud',
                    'Harmful Behaviour',
                    'Termination of Contract'
                ]
    
            }
        },
        dateModified:{
            type: Date,
            default: Date.now
        }
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

//  Password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken
}
module.exports = mongoose.model('user', userSchema)