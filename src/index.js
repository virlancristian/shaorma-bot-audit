const { Client, Events, GatewayIntentBits, email } = require('discord.js');
const nodemailer = require('nodemailer');

const { 
    TOKEN, 
    SMTP_HOST, 
    SMTP_PORT, 
    SMTP_IS_SECURE, 
    SMTP_USERNAME, 
    SMTP_PASSWORD,
    EMAIL_RECEIVER,
    EMAIL_SENDER
} = require("./config/config");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildModeration] });
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_IS_SECURE,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
});

const EMAIL_TEMPLATE = `
    Un audit log nou a avut loc pe server.<br><br>

    Target: {target}<br>
    Action: {action}
`;

const formatEmail = (auditLogData) => {
    const {
        target,
        action
    } = auditLogData;
    let emailBody = EMAIL_TEMPLATE;

    emailBody = emailBody.replace("{target}", target);
    emailBody = emailBody.replace("{action}", action);

    return emailBody;
};

const sendEmail = async (emailData) => {
    const {
        to,
        from,
        subject,
        text
    } = emailData;

    try {
        await transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: text,
        })
    } catch(error) {
        console.error(`Error while trying to send e-mail: ${error}`);
    }
};

const handleAuditLog = async (auditLog) => {
    const emailBody = formatEmail({ target: auditLog.targetType, action: auditLog.actionType });
    await sendEmail({
        to: EMAIL_RECEIVER,
        from: EMAIL_SENDER,
        subject: "Audit Log Nou",
        text: emailBody
    });
};

client.on(Events.GuildAuditLogEntryCreate, handleAuditLog);

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}`);
});


client.login(TOKEN);