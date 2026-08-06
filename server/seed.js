const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Service = require('./models/Service');
const Trainer = require('./models/Trainer');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') });

const services = [
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

const trainers = [
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

const seedData = async () => {
  try {
    console.log('Connecting to database for seeding...');
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined. Make sure server/.env exists and contains MONGO_URI.');
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully to host: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);

    // Clear old data
    console.log('Clearing old Services collection...');
    const deletedServicesResult = await Service.deleteMany({});
    console.log(`Cleared ${deletedServicesResult.deletedCount} old Services.`);
    
    console.log('Clearing old Trainers collection...');
    const deletedTrainersResult = await Trainer.deleteMany({});
    console.log(`Cleared ${deletedTrainersResult.deletedCount} old Trainers.`);

    // Seed services
    console.log('Seeding Services...');
    const insertedServices = await Service.insertMany(services);
    console.log(`Successfully inserted ${insertedServices.length} Service documents.`);

    // Seed trainers
    console.log('Seeding Trainers...');
    const insertedTrainers = await Trainer.insertMany(trainers);
    console.log(`Successfully inserted ${insertedTrainers.length} Trainer documents.`);

    // Verification queries
    const verifiedServiceCount = await Service.countDocuments();
    console.log(`Verification: Total Services in database: ${verifiedServiceCount}`);
    const verifiedTrainerCount = await Trainer.countDocuments();
    console.log(`Verification: Total Trainers in database: ${verifiedTrainerCount}`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
