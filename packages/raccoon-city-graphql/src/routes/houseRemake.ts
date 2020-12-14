import {nodemailerTransportConfig} from '../email.config';
import {logger} from '../aws/logger';

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/houseremake/handle-form', async (req, res) => {
    const {name, phone} = req.body;
    const messageText = `${name} отправил(а) заявку, вот номер ${phone}`;
    const sender = process.env.HOUSE_REMAKE_SENDER;
    const receiver = process.env.HOUSE_REMAKE_RECEIVER;

    const transporter = nodemailer.createTransport({
        ...nodemailerTransportConfig,
        auth: {
            user: sender,
            pass: process.env.HOUSE_REMAKE_SENDER_PWD
        }
    });

    try {
        await transporter.sendMail({
            from: sender,
            to: receiver,
            subject: `Заявка из ${process.env.CRM_NAME}`,
            text: messageText,
            html: messageText
        });

        res.status(200).json({ok: true});
    } catch (error) {
        logger.warn(`The email to ${receiver} was not sent`);
        res.status(500).json({ok: false});
    }
});

module.exports = router;
