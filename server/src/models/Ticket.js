const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    purchase_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['unused', 'used', 'canceled', 'expired'], default: 'unused' },
    payment_method: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'], required: true },
    amount_paid: { type: Number, required: true },
    qr_code: { type: String, unique: true } // Mã QR duy nhất cho từng vé
});

const Ticket = mongoose.model('Ticket', TicketSchema);
module.exports = Ticket;
