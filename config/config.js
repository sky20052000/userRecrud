require("dotenv").config();

module.exports = {
    PORT: process.env.port,
    HOST: process.env.host_url,
    SECRET_KEY: process.env.jwt_key,
    Mongo_Url : process.env.mongo_url
}