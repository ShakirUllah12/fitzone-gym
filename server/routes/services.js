const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Mock data as fallback
const mockServices = [
  {
    name: "Weight Training & Strength",
    slug: "weight-training",
    description: "Unlock your physical potential with our comprehensive strength training program. Our dedicated free weight arena and professional equipment provide the ultimate setup to build lean muscle mass, improve bone density, and gain functional power. Learn correct biomechanics and lifting techniques under the guidance of our elite trainers.",
    duration: "60 Mins",
    icon: "dumbbell"
  },
  {
    name: "Cardio Fitness & Conditioning",
    slug: "cardio-fitness",
    description: "Boost your endurance, optimize cardiovascular health, and burn calories with our high-energy conditioning classes. We feature top-of-the-line treadmills, elliptical trainers, and rowing stations paired with customized training intervals. Build stamina and get your heart pumping in a supportive, high-tempo environment.",
    duration: "45 Mins",
    icon: "heartbeat"
  },
  {
    name: "One-on-One Personal Training",
    slug: "personal-training",
    description: "Accelerate your results with one-on-one personal coaching tailored entirely to your body composition and goals. Our certified fitness professionals create custom workout regimens, track your form in real-time, and keep you accountable every step of the way. Ideal for rehabilitation, breaking performance plateaus, or targeted body transformation.",
    duration: "60 Mins",
    icon: "user-check"
  },
  {
    name: "High-Intensity Group Classes",
    slug: "group-classes",
    description: "Join our engaging group workouts that combine the energy of a community with the structure of professional coaching. From circuit training to bodyweight HIIT, these dynamic sessions are designed to push your limits and keep you motivated. Meet fellow fitness enthusiasts in Islamabad and challenge yourself together.",
    duration: "50 Mins",
    icon: "users"
  },
  {
    name: "Yoga & Flexibility Training",
    slug: "yoga-flexibility",
    description: "Restore balance, enhance flexibility, and relieve mental stress through our guided yoga and mobility sessions. Suitable for all skill levels, these classes focus on controlled breathing, structural alignment, and core stabilization. Perfect for active recovery, muscle lengthening, and improving overall mobility.",
    duration: "60 Mins",
    icon: "spa"
  },
  {
    name: "Elite Nutrition Coaching",
    slug: "nutrition-coaching",
    description: "Complement your hard work in the gym with science-based nutrition plans custom-fit for your lifestyle. Our nutritionists guide you through calorie tracking, macronutrient balancing, and healthy meal prepping. We design sustainable eating habits without restrictive diets to ensure your results last a lifetime.",
    duration: "30 Mins Consultation",
    icon: "utensils"
  }
];

// @route   GET /api/services
// @desc    Get all gym services
router.get('/', async (req, res) => {
  try {
    if (process.env.USE_MOCK_DATA === 'true') {
      return res.status(200).json(mockServices);
    }
    const services = await Service.find({});
    if (services.length === 0) {
      return res.status(200).json(mockServices);
    }
    res.status(200).json(services);
  } catch (error) {
    console.error('Fetch services error, returning mock fallback:', error);
    res.status(200).json(mockServices);
  }
});

// @route   GET /api/services/:slug
// @desc    Get single gym service by slug
router.get('/:slug', async (req, res) => {
  try {
    if (process.env.USE_MOCK_DATA === 'true') {
      const service = mockServices.find(s => s.slug === req.params.slug.toLowerCase());
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      return res.status(200).json(service);
    }
    const service = await Service.findOne({ slug: req.params.slug.toLowerCase() });
    if (!service) {
      // Try to find in mock if DB has no record
      const mockService = mockServices.find(s => s.slug === req.params.slug.toLowerCase());
      if (mockService) return res.status(200).json(mockService);
      return res.status(404).json({ error: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error('Fetch single service error, searching mock fallback:', error);
    const mockService = mockServices.find(s => s.slug === req.params.slug.toLowerCase());
    if (mockService) return res.status(200).json(mockService);
    res.status(500).json({ error: 'Server Error: Unable to fetch service details' });
  }
});

module.exports = router;
