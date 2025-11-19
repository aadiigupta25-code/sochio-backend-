const admin = require("firebase-admin");
const initializeSettings = require("../index");

const initFirebase = async () => {
  try {
    await initializeSettings;
    
    // Check if valid Firebase credentials exist
    if (!global.settingJSON.privateKey || 
        !global.settingJSON.privateKey.private_key || 
        global.settingJSON.privateKey.private_key === "your_private_key") {
      console.log("Firebase credentials not configured, skipping initialization");
      return null;
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(global.settingJSON.privateKey),
    });
    console.log("Firebase Admin SDK initialized successfully");
    return admin;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    return null;
  }
};

module.exports = initFirebase();
