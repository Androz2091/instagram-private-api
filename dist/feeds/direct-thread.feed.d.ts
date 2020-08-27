import { Feed } from '../core/feed';
import { DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem } from '../responses';
interface DirectThreadFeedItemsOptions {
  cursor?: string;
  limit?: number;
}
export declare class DirectThreadFeed extends Feed<DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem> {
  id: string;
  seqId: number;
  cursor: string;
  set state(body: DirectThreadFeedResponse);
  request(opts?: DirectThreadFeedItemsOptions): Promise<DirectThreadFeedResponse>;
  items(opts?: DirectThreadFeedItemsOptions): Promise<DirectThreadFeedResponseItemsItem[]>;
}
export {};
