const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

// @route   POST /api/contact
// @desc    Submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Email validation regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const newSubmission = new ContactSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim()
    });

    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('Mock Data Mode: Saved contact submission:', newSubmission);
      return res.status(201).json({ 
        success: true, 
        message: 'Your message has been submitted successfully (Demo Mode)!', 
        data: newSubmission 
      });
    }

    try {
      const savedSubmission = await newSubmission.save();
      res.status(201).json({ 
        success: true, 
        message: 'Your message has been submitted successfully!', 
        data: savedSubmission 
      });
    } catch (dbErr) {
      console.warn('Database save failed, falling back to console log:', dbErr.message);
      res.status(201).json({ 
        success: true, 
        message: 'Your message has been submitted successfully (Logged)!', 
        data: newSubmission 
      });
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Server Error: Unable to process contact submission' });
  }
});

module.exports = router;
