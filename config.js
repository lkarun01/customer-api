module.exports = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  URL: process.env.BASE_URL || "http://localhost:3000",
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb://lalanke:12345@cluster0-shard-00-00-sgfqa.mongodb.net:27017,cluster0-shard-00-01-sgfqa.mongodb.net:27017,cluster0-shard-00-02-sgfqa.mongodb.net:27017/customer-api?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
  JWT_SECRET: process.env.JWT_SECRET || "secret1"
};
