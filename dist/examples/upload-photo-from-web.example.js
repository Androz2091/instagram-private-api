'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
const request_promise_1 = require('request-promise');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log(JSON.stringify(auth));
  const imageBuffer = await request_promise_1.get({
    url: 'https://picsum.photos/800/800',
    encoding: null,
  });
  const publishResult = await ig.publish.photo({
    file: imageBuffer,
    caption: 'Really nice photo from the internet! 💖',
  });
  console.log(publishResult);
})();
//# sourceMappingURL=upload-photo-from-web.example.js.map
