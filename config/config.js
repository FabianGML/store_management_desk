require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    dbUrl: process.env.DATABASE_URL,
    jwtKey: process.env.JWT_KEY
}

module.exports = { config }