'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
const Bluebird = require('bluebird');
const inquirer = require('inquirer');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  Bluebird.try(async () => {
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    console.log(auth);
  })
    .catch(src_1.IgCheckpointError, async () => {
      console.log(ig.state.checkpoint);
      await ig.challenge.auto(true);
      console.log(ig.state.checkpoint);
      const { code } = await inquirer.prompt([
        {
          type: 'input',
          name: 'code',
          message: 'Enter code',
        },
      ]);
      console.log(await ig.challenge.sendSecurityCode(code));
    })
    .catch(e => console.log('Could not resolve checkpoint:', e, e.stack));
})();
//# sourceMappingURL=checkpoint.example.js.map
