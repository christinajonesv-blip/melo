const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recipients: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        default: 'Sent'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Campaign', campaignSchema);