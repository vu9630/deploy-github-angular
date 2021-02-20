export interface SearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken:string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}



interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
}

interface Default {
  url: string;
  width?: number;
  height?: number;
}

interface Id {
  kind: string;
  channelId?: string;
  videoId?: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface VideoDetailResponse {
  kind: string;
  etag: string;
  items: Item[];
  pageInfo: PageInfo;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Item {
  kind: string;
  etag: string;
  id: {
    videoId:string
  };
  snippet: Snippet;
  statistics?: Statistics;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
}

interface Localized {
  title: string;
  description: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres: Default;
}


