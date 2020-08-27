'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv/config');
const src_1 = require('../src');
(async () => {
  const ig = new src_1.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  const followersFeed = ig.feed.accountFollowers(auth.pk);
  const wholeResponse = await followersFeed.request();
  console.log(wholeResponse);
  const items = await followersFeed.items();
  console.log(items);
  const thirdPageItems = await followersFeed.items();
  console.log(thirdPageItems);
  const feedState = followersFeed.serialize();
  console.log(feedState);
  followersFeed.deserialize(feedState);
  const fourthPageItems = await followersFeed.items();
  console.log(fourthPageItems);
  followersFeed.items$.subscribe(
    followers => console.log(followers),
    error => console.error(error),
    () => console.log('Complete!'),
  );
})();
//# sourceMappingURL=account-followers.feed.example.js.map
