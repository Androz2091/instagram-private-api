import { Feed } from '../core/feed';
import { DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem } from '../responses';
import { DirectThreadEntity } from '../entities';
interface DirectPendingInboxFeedItemsOptions {
  cursor?: string;
  thread_message_limit?: number;
  limit?: number;
}
export declare class DirectPendingInboxFeed extends Feed<DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem> {
  private cursor;
  private seqId;
  set state(body: DirectInboxFeedResponse);
  request(opts?: DirectPendingInboxFeedItemsOptions): Promise<DirectInboxFeedResponse>;
  items(opts?: DirectPendingInboxFeedItemsOptions): Promise<DirectInboxFeedResponseThreadsItem[]>;
  records(): Promise<DirectThreadEntity[]>;
}
export {};
