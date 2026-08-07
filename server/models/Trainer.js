const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Trainer name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required']
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    trim: true
  },
  photoUrl: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.models.Trainer || mongoose.model('Trainer', trainerSchema);
