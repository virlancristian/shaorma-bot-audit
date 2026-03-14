const dotenv = require('dotenv');

const config = dotenv.config();

module.exports = {
    token: config["parsed"]["DISCORD_TOKEN"]
}