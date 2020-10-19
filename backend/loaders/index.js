const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const passportLoader = require('./passport');

module.exports = async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('Connection to MongoDB Atlas cluster established');

  await passportLoader();
  console.log("Passport middleware successfully configured");
  
  await expressLoader({ app: expressApp, connection: mongoConnection });
}