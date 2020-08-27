'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
function fakeSave(data) {
  return data;
}
function fakeExists() {
  return false;
}
function fakeLoad() {
  return '';
}
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  ig.request.end$.subscribe(async () => {
    const serialized = await ig.state.serialize();
    delete serialized.constants;
    fakeSave(serialized);
  });
  if (fakeExists()) {
    await ig.state.deserialize(fakeLoad());
  }
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
})();
//# sourceMappingURL=session.example.js.map
