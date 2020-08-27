'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = require('../src');
const Bluebird = require('bluebird');
const ig = new src_1.IgApiClient();
async function login() {
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
}
(async () => {
  await login();
  const { broadcast_id, upload_url } = await ig.live.create({
    previewWidth: 720,
    previewHeight: 1280,
    message: 'My message',
  });
  const { stream_key, stream_url } = src_1.LiveEntity.getUrlAndKey({ broadcast_id, upload_url });
  console.log(`Start your stream on ${stream_url}.\n
    Your key is: ${stream_key}`);
  const startInfo = await ig.live.start(broadcast_id);
  console.log(startInfo);
  let lastCommentTs = await printComments(broadcast_id, 0);
  await ig.live.unmuteComment(broadcast_id);
  await Bluebird.delay(2000);
  lastCommentTs = await printComments(broadcast_id, lastCommentTs);
  await ig.live.comment(broadcast_id, 'A comment');
  await ig.live.endBroadcast(broadcast_id);
})();
async function printComments(broadcastId, lastCommentTs) {
  const { comments } = await ig.live.getComment({ broadcastId, lastCommentTs });
  if (comments.length > 0) {
    comments.forEach(comment => console.log(`${comment.user.username}: ${comment.text}`));
    return comments[comments.length - 1].created_at;
  } else {
    return lastCommentTs;
  }
}
//# sourceMappingURL=live.example.js.map
