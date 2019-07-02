if(process.env.ENV==='prod'){
    module.exports = {
        googleClientID: process.env.GOOGLE_CLIENT,
        googleClientSecret: process.env.GOOGLE_SECRET,
        mongoURL: process.env.MONGO_URL,
        cookieKey: process.env.COOKIE_KEY
    };
}else{
    const dev = require('./dev');
    module.exports = dev;
}

