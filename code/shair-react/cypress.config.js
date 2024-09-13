const { defineConfig } = require("cypress");
const localIP = process.env.REACT_APP_LOCAL_IP;

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://${localIP}:3000`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
