const express = require('express');
const nodemailer = require('nodemailer');
const authMiddleware = require('../middleware/authMiddleware');
const Campaign = require('../models/Campaign');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// SEND CAMPAIGN
router.post('/send', authMiddleware, async (req, res) => {
    try {
        const { subject, message, recipients } = req.body;

        if (!subject || !message || !Array.isArray(recipients) || recipients.length === 0) {
            return res.status(400).json({
                message: 'Please provide subject, message and recipients.'
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const uniqueRecipients = [...new Set(
            recipients.map(email => String(email).trim().toLowerCase())
        )];

        if (
            uniqueRecipients.length > 50 ||
            !uniqueRecipients.every(email => emailRegex.test(email))
        ) {
            return res.status(400).json({
                message: 'Invalid recipients or maximum limit of 50 exceeded.'
            });
        }

        if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
            return res.status(500).json({
                message: 'Email configuration is missing.'
            });
        }

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            bcc: uniqueRecipients,
            subject: subject,
            text: message
        });

        await Campaign.create({
            userId: req.userId,
            subject,
            message,
            recipients: uniqueRecipients,
            status: 'Sent'
        });

        res.status(200).json({
            message: 'Your campaign was sent successfully!'
        });

    } catch (error) {
        console.error('Email sending error:', error);

        res.status(500).json({
            message: 'Failed to send campaign. Please check your email configuration.'
        });
    }
});

module.exports = router;
// GET CAMPAIGN HISTORY
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.status(200).json(campaigns);

    } catch (error) {
        console.error('History error:', error);
        res.status(500).json({
            message: 'Failed to fetch campaign history'
        });
    }
});