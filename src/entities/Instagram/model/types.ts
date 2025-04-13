export interface IInstagramUserInfo {
  id: string;
  username: string;
  media_count: number;
  profile_picture_url?: string;
}

export const enum EInstagramType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  CAROUSEL_ALBUM = "CAROUSEL_ALBUM",
}

export interface IInstagramPostChild {
  id: string;
  media_type: EInstagramType;
  media_url: string;
}

export interface IInstagramPost {
  id: string; // ID поста
  caption?: string; // Текст поста (опционально)
  media_type: EInstagramType; // Тип медиа
  media_url?: string; // Ссылка на основное медиа
  thumbnail_url?: string | null; // Ссылка на миниатюру (для видео)
  timestamp: string; // Время публикации
  username: string; // Имя пользователя
  permalink: string; // Ссылка на пост
  children?: {
    data: IInstagramPostChild[]; // Медиа в альбоме (только для CAROUSEL_ALBUM)
  };
}

export interface IInstagramDownloadedPost<T extends object = object> extends IInstagramPost {
  accountId: string;
  created_at: string;
  downloaded_id: string; // id поста + user id
  customData?: T; // Кастомные данные для поста (заголовок, описание и тд)
}

export interface IInstagramAccount {
  id: string;
  created_at: string;
  profile_picture_url: string;
  username: string;
  user_id: string;
  instagram_user_id: string;
  account_id: string;
}

export interface IInstagramAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_id: string | number;
}

export interface IInstagramMediaResponseData {
  data: IInstagramPost[];
  paging: IInstagramMediaResponseDataPaging;
}

export interface IInstagramMediaResponseDataPaging {
  cursors: {
    before: string;
    after: string;
  };
  next?: string;
}
