'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = require('../src');
const util_1 = require('util');
const fs_1 = require('fs');
const readFileAsync = util_1.promisify(fs_1.readFile);
const ig = new src_1.IgApiClient();
async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}
(async () => {
  await login();
  const [thread] = await ig.feed.directInbox().records();
  await sendPhoto(thread);
  await sendVideo(thread);
  await sendPhotoStory(thread);
  await sendVideoStory(thread);
})();
async function sendPhoto(thread) {
  const photo = await readFileAsync('PATH_TO_PHOTO.jpg');
  console.log(
    await thread.broadcastPhoto({
      file: photo,
    }),
  );
}
async function sendVideo(thread) {
  const video = await readFileAsync('PATH_TO_VIDEO.mp4');
  console.log(
    await thread.broadcastVideo({
      video,
      transcodeDelay: 5 * 1000,
    }),
  );
}
async function sendVideoStory(thread) {
  const video = await readFileAsync('PATH_TO_VIDEO.mp4');
  const cover = await readFileAsync('PATH_TO_COVER.jpg');
  console.log(
    await thread.broadcastStory({
      video,
      coverImage: cover,
      viewMode: 'replayable',
    }),
  );
}
async function sendPhotoStory(thread) {
  const photo = await readFileAsync('PATH_TO_PHOTO.jpg');
  console.log(
    await thread.broadcastStory({
      file: photo,
      viewMode: 'once',
    }),
  );
}
//# sourceMappingURL=dm-thrad.broadast-media.example.js.map
