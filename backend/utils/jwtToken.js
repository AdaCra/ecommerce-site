// create and save token in cookies 
const sendToken = (user, statusCode, res) => {

    const token = user.getJwtToken();

    // cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY_DAYS * 86400000 /* milliseconds to days */
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token,  options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;