'use strict';
var __decorate =
  (this && this.__decorate) ||
  function(decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function(k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DirectPendingInboxFeed = void 0;
const class_transformer_1 = require('class-transformer');
const feed_1 = require('../core/feed');
class DirectPendingInboxFeed extends feed_1.Feed {
  set state(body) {
    this.moreAvailable = body.inbox.has_older;
    this.seqId = body.seq_id;
    this.cursor = body.inbox.oldest_cursor;
  }
  async request(opts) {
    var _a, _b, _c;
    const { body } = await this.client.request.send({
      url: `/api/v1/direct_v2/pending_inbox/`,
      qs: {
        visual_message_return_type: 'unseen',
        cursor: (_a = opts.cursor) !== null && _a !== void 0 ? _a : this.cursor,
        direction: this.cursor ? 'older' : void 0,
        seq_id: this.seqId,
        thread_message_limit: (_b = opts.thread_message_limit) !== null && _b !== void 0 ? _b : 10,
        persistentBadging: true,
        limit: (_c = opts.limit) !== null && _c !== void 0 ? _c : 20,
      },
    });
    this.state = body;
    return body;
  }
  async items(opts) {
    const response = await this.request(opts);
    return response.inbox.threads;
  }
  async records() {
    const threads = await this.items();
    return threads.map(thread => this.client.entity.directThread(thread.thread_id));
  }
}
__decorate(
  [class_transformer_1.Expose(), __metadata('design:type', String)],
  DirectPendingInboxFeed.prototype,
  'cursor',
  void 0,
);
__decorate(
  [class_transformer_1.Expose(), __metadata('design:type', Number)],
  DirectPendingInboxFeed.prototype,
  'seqId',
  void 0,
);
exports.DirectPendingInboxFeed = DirectPendingInboxFeed;
//# sourceMappingURL=direct-pending.feed.js.map
