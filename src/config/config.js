const dotenv = require('dotenv');

const config = dotenv.config();

module.exports = {
    TOKEN: config["parsed"]["DISCORD_TOKEN"],
    SMTP_HOST: config["parsed"]["SMTP_HOST"],
    SMTP_PORT: config["parsed"]["SMTP_PORT"],
    SMTP_IS_SECURE: config["parsed"]["SMTP_PORT"] === "true",
    SMTP_USERNAME: config["parsed"]["SMTP_USERNAME"],
    SMTP_PASSWORD: config["parsed"]["SMTP_PASSWORD"],
    EMAIL_SENDER: config["parsed"]["EMAIL_SENDER"],
    EMAIL_RECEIVER: config["parsed"]["EMAIL_RECEIVER"]
}