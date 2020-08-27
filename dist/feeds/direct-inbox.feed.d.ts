import { Feed } from '../core/feed';
import { DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem } from '../responses';
import { DirectThreadEntity } from '../entities';
interface DirectInboxFeedItemsOptions {
  cursor?: string;
  thread_message_limit?: number;
  limit?: number;
}
export declare class DirectInboxFeed extends Feed<DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem> {
  private cursor;
  private seqId;
  set state(body: DirectInboxFeedResponse);
  request(opts?: DirectInboxFeedItemsOptions): Promise<DirectInboxFeedResponse>;
  items(opts?: DirectInboxFeedItemsOptions): Promise<DirectInboxFeedResponseThreadsItem[]>;
  records(): Promise<DirectThreadEntity[]>;
}
export {};
