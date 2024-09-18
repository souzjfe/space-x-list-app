export type LaunchData = {
  id: string;
  name: string;
  date_utc: string;
  details?: string;
  links: {
    webcast: string | null;
    youtube_id: string | null;
    article: string;
  };
}