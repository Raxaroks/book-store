
export const AppConfig = () => ({
  environment: process.env.NODE_ENV || 'dev',
  port: process.env.PORT,
  mongoDb: {
    hostUri: process.env.MONGO_DB_HOST_URI,
    name: process.env.MONGO_DB_COLLECTION
  } 
});
