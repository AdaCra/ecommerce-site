const User = require ( '../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//user registration via /api/v1/register
exports.registerUser = catchAsyncErrors (async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/kccvibpsuiusmwfepb3m',
            url: 'https://res.cloudinary.com/shopit/image/upload/v1606305757/avatars/kccvibpsuiusmwfepb3m.png',
        }
});

const token = user.getJwtToken();



res.status(201).json({
    success: true,
    token
})
})

// user login via /api/v1/login

exports.loginUser = catchAsyncErrors (async (req, res, next) => {
    const {email, password} = req.body


    //  check if request data matches DB
    if( !email || !password) {
        return next( new ErrorHandler ( 'Please enter Email and Password' , 400));
    }


    // get user from DB
    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid User Email or Password', 401));
    }


    // check password legitimacy
    const passwordMatch = await user.comparePassword(password)
    if(!passwordMatch) {
        return next(new ErrorHandler('Invalid User Email or Password', 401));
    }
    sendToken(user, 200, res)
})

// forgot: password reset email via /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors ( async ( req, res, next ) => {
    const user = await User.findOne({ email: req.body.email});

    if(!user) { 
        return next (new ErrorHandler('This email is not registered on our Database', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();    

    await user.save({ validateBeforeSave: false});

    // create password reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nThis link will only be valid for 30 minutes\n\n If you did not request this email, please ignore it.`
    try{
        await sendEmail({
            email: user.email, 
            subject: 'BigBuy Password Recovery Request',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validationBeforeSave : false })

        return next(new ErrorHandler( error.message, 500 ))
    }
})


// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})



// logout user via /api/v1/logout
exports.logout = catchAsyncErrors ( async ( req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        status: true,
        message: 'User is logged out'
    })
})