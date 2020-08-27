'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log(JSON.stringify(auth));
  const targetUser = await ig.user.searchExact('username');
  const reelsFeed = ig.feed.reelsMedia({
    userIds: [targetUser.pk],
  });
  const storyItems = await reelsFeed.items();
  if (storyItems.length === 0) {
    console.log(`${targetUser.username}'s story is empty`);
    return;
  }
  const seenResult = await ig.story.seen([storyItems[0]]);
  console.log(seenResult.status);
})();
//# sourceMappingURL=user-stories-watching.example.js.map
