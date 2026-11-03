export interface InstagramMediaPost {
  id: string;
  caption: string;
  media_type: "IMAGE" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
}

export interface InstagramMediaFeed {
  username: string;
  updated_at: string | null;
  posts: InstagramMediaPost[];
}
