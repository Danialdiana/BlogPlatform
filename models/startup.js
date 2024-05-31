const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    contact: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;