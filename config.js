module.exports = {
  //Port
  PORT: process.env.PORT || 5000,

  //Gmail credentials for send email
  EMAIL: process.env.EMAIL || "your-email@gmail.com",
  PASSWORD: process.env.EMAIL_PASSWORD || "your-app-password",

  //Secret key for jwt
  JWT_SECRET: process.env.JWT_SECRET || "sochio-jwt-secret-2024",

  //Project Name
  projectName: process.env.PROJECT_NAME || "Sochio",

  //baseURL
  baseURL: process.env.BASE_URL || "https://sochio-backend.onrender.com/",

  //Secret key for API
  secretKey: process.env.API_SECRET_KEY || "sochio-api-secret-2024",

  //Mongodb string
  MONGODB_CONNECTION_STRING: process.env.MONGODB_URI || "mongodb+srv://aadiigupta25_db_user:DUyFwkjQjQuyLYrU@sochio-cluster.zmj42of.mongodb.net/sochio_db?retryWrites=true&w=majority"
};