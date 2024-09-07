module.exports = {
  apps: [
    {
      name: "shair-express",
      script: "./App.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
