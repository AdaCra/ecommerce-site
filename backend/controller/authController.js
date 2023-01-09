const User = require ( '../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

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

//  