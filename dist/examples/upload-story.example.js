'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const src_1 = require('../src');
const fs_1 = require('fs');
const luxon_1 = require('luxon');
const sticker_builder_1 = require('../src/sticker-builder');
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
  const path = './myStory.jpg';
  const file = await readFileAsync(path);
  await ig.publish.story({
    file,
    stickerConfig: new sticker_builder_1.StickerBuilder()
      .add(
        sticker_builder_1.StickerBuilder.hashtag({
          tagName: 'insta',
        }).center(),
      )
      .add(
        sticker_builder_1.StickerBuilder.mention({
          userId: ig.state.cookieUserId,
        }).center(),
      )
      .add(
        sticker_builder_1.StickerBuilder.question({
          question: 'My Question',
        }).scale(0.5),
      )
      .add(
        sticker_builder_1.StickerBuilder.question({
          question: 'Music?',
          questionType: 'music',
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.countdown({
          text: 'My Countdown',
          endTs: luxon_1.DateTime.local().plus(luxon_1.Duration.fromObject({ hours: 1 })),
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.chat({
          text: 'Chat name',
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.location({
          locationId: (await ig.locationSearch.index(13, 37)).venues[0].external_id,
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.poll({
          question: 'Question',
          tallies: [{ text: 'Left' }, { text: 'Right' }],
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.quiz({
          question: 'Question',
          options: ['0', '1', '2', '3'],
          correctAnswer: 1,
        }),
      )
      .add(
        sticker_builder_1.StickerBuilder.slider({
          question: 'Question',
          emoji: '❤',
        }),
      )
      .add(sticker_builder_1.StickerBuilder.mentionReel((await ig.feed.userStory('username').items())[0]).center())
      .add(sticker_builder_1.StickerBuilder.attachmentFromMedia((await ig.feed.timeline().items())[0]).center())
      .add(
        sticker_builder_1.StickerBuilder.hashtag({
          tagName: 'insta',
          width: 0.5,
          height: 0.5,
          x: 0.5,
          y: 0.5,
        }),
      )
      .build(),
  });
})();
//# sourceMappingURL=upload-story.example.js.map
