const express = require('express');
const router = express.Router();
const Trainer = require('../models/Trainer');

// Mock data as fallback
const mockTrainers = [
  {
    name: "Ali Khan",
    slug: "ali-khan",
    specialty: "Strength & Conditioning",
    bio: "Ali is a former national powerlifting athlete with over eight years of experience coaching strength training. He specializes in compound lifting techniques, power building, and helping clients safely break personal strength plateaus. His programs focus on structural safety, lifting biomechanics, and mental fortitude.",
    photoUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Zainab Malik",
    slug: "zainab-malik",
    specialty: "Yoga & Vinyasa Flow",
    bio: "Zainab completed her advanced yoga teacher training in Bali and specializes in Vinyasa flow and mobility coaching. She focuses on aligning breath with movement to build functional core strength and promote active recovery. Her calm yet challenging classes are popular among both beginners and seasoned athletes.",
    photoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Hamza Ahmed",
    slug: "hamza-ahmed",
    specialty: "HIIT & Fat Loss Coaching",
    bio: "Hamza is a certified high-intensity trainer known for his energetic coaching style and motivating music tracks. He designs metabolic conditioning sessions that optimize calorie burn and boost cardiovascular stamina. He is dedicated to helping clients build long-term active habits and feel energized.",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Sarah Qureshi",
    slug: "sarah-qureshi",
    specialty: "Sports Nutrition & Body Composition",
    bio: "Sarah holds a degree in Sports Nutrition and works with clients to build sustainable, goal-oriented meal plans. She believes that fitness success is built in the kitchen and works to align nutrition with daily workout patterns. Her holistic approach ensures long-term lifestyle changes and high energy levels.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

// @route   GET /api/trainers
// @desc    Get all gym trainers
router.get('/', async (req, res) => {
  try {
    if (process.env.USE_MOCK_DATA === 'true') {
      return res.status(200).json(mockTrainers);
    }
    const trainers = await Trainer.find({});
    if (trainers.length === 0) {
      return res.status(200).json(mockTrainers);
    }
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Fetch trainers error, returning mock fallback:', error);
    res.status(200).json(mockTrainers);
  }
});

// @route   GET /api/trainers/:slug
// @desc    Get single trainer by slug
router.get('/:slug', async (req, res) => {
  try {
    if (process.env.USE_MOCK_DATA === 'true') {
      const trainer = mockTrainers.find(t => t.slug === req.params.slug.toLowerCase());
      if (!trainer) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      return res.status(200).json(trainer);
    }
    const trainer = await Trainer.findOne({ slug: req.params.slug.toLowerCase() });
    if (!trainer) {
      // Try to find in mock if DB has no record
      const mockTrainer = mockTrainers.find(t => t.slug === req.params.slug.toLowerCase());
      if (mockTrainer) return res.status(200).json(mockTrainer);
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.status(200).json(trainer);
  } catch (error) {
    console.error('Fetch single trainer error, searching mock fallback:', error);
    const mockTrainer = mockTrainers.find(t => t.slug === req.params.slug.toLowerCase());
    if (mockTrainer) return res.status(200).json(mockTrainer);
    res.status(500).json({ error: 'Server Error: Unable to fetch trainer details' });
  }
});

module.exports = router;
