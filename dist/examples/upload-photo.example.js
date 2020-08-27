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
  const path = './myPicture.jpg';
  const { latitude, longitude, searchQuery } = {
    latitude: 0.0,
    longitude: 0.0,
    searchQuery: 'place',
  };
  const locations = await ig.search.location(latitude, longitude, searchQuery);
  const mediaLocation = locations[0];
  console.log(mediaLocation);
  const publishResult = await ig.publish.photo({
    file: await readFileAsync(path),
    caption: 'my caption',
    location: mediaLocation,
    usertags: {
      in: [await generateUsertagFromName('instagram', 0.5, 0.5)],
    },
  });
  console.log(publishResult);
})();
async function generateUsertagFromName(name, x, y) {
  x = clamp(x, 0.0001, 0.9999);
  y = clamp(y, 0.0001, 0.9999);
  const { pk } = await ig.user.searchExact(name);
  return {
    user_id: pk,
    position: [x, y],
  };
}
const clamp = (value, min, max) => Math.max(Math.min(value, max), min);
//# sourceMappingURL=upload-photo.example.js.map
