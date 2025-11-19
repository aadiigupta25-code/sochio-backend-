require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('./config');

// Admin Model
const adminSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: "Admin" },
  email: { type: String, trim: true },
  password: { type: String, trim: true },
  image: { type: String, trim: true, default: "" },
  purchaseCode: { type: String, default: "" },
}, {
  timestamps: true,
  versionKey: false,
});

const Admin = mongoose.model('Admin', adminSchema);

// Login Model
const loginSchema = new mongoose.Schema({
  login: { type: Boolean, default: false }
}, {
  timestamps: true,
  versionKey: false,
});

const Login = mongoose.model('Login', loginSchema);

async function createDefaultAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_CONNECTION_STRING);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@sochio.com' });
    
    if (existingAdmin) {
      console.log('Default admin already exists!');
      console.log('Email: admin@sochio.com');
      console.log('Password: Admin@123');
      process.exit(0);
    }

    // Create default admin
    const hashedPassword = bcrypt.hashSync('Admin@123', 10);
    
    const admin = new Admin({
      name: 'Sochio Admin',
      email: 'admin@sochio.com',
      password: hashedPassword,
      purchaseCode: 'SOCHIO2024'
    });

    await admin.save();
    console.log('✅ Default admin created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@sochio.com');
    console.log('Password: Admin@123');
    console.log('Purchase Code: SOCHIO2024');
    console.log('-----------------------------------');

    // Create login entry
    const login = await Login.findOne({});
    if (!login) {
      const newLogin = new Login({ login: true });
      await newLogin.save();
      console.log('✅ Login entry created');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating default admin:', error);
    process.exit(1);
  }
}

createDefaultAdmin();
