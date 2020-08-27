'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
const shttps = require('socks-proxy-agent');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.request.defaults.agentClass = shttps;
  ig.request.defaults.agentOptions = {
    hostname: '127.0.0.1',
    port: 8000,
    protocol: 'socks:',
  };
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log(JSON.stringify(auth));
})();
//# sourceMappingURL=socks5-proxy.example.js.map
