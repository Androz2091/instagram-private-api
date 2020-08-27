'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = require('../src');
const fs_1 = require('fs');
const util_1 = require('util');
const readFileAsync = util_1.promisify(fs_1.readFile);
const ig = new src_1.IgApiClient();
async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}
(async () => {
  await login();
  const videoPath = './myVideo.mp4';
  const coverPath = './myVideoCover.jpg';
  const publishResult = await ig.publish.video({
    video: await readFileAsync(videoPath),
    coverImage: await readFileAsync(coverPath),
  });
  console.log(publishResult);
})();
//# sourceMappingURL=upload-video.example.js.map
