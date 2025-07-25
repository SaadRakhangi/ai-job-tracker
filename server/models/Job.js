const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Rejected', 'Offer'],
    default: 'Applied',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 👈 links to User model
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
