const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  videoUploadOnPasses: false,
  screenshotOnRunFailure: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  trashAssetsBeforeRuns: true,

  e2e: {
    baseUrl: 'https://www.neubodhi.in',

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
      return config
    },

    retries: {
      runMode: 1,
      openMode: 0,
    },
  },

  defaultCommandTimeout: 20000,
  pageLoadTimeout: 90000,
  requestTimeout: 20000,
  responseTimeout: 60000,

  viewportWidth: 1280,
  viewportHeight: 720,
})