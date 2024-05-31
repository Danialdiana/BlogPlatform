const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: String }, // Добавленное поле для статуса пользователя
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

    // image: { type: Buffer, required: true },
