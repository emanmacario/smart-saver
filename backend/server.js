const config = require('./config');
const express = require('express');

// Configure and start the Express server
(async () => {
  const app = express();

  await require('./loaders')({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
})();