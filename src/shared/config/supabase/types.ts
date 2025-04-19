import type { SearchOptions } from "@supabase/storage-js/src/lib/types";
import type { FileObject } from "@supabase/storage-js";

import { EStorageKey } from "@shared/types/storage";

export interface ISupabaseFileData {
  // userId: string; // TODO: потом добавить
  filePath: string;
  fileName?: string;
  bucket: EStorageKey;
  type?: "client" | "server";
  hideUserPath?: boolean;
  options?: SearchOptions;
}

export type TSupabaseFileObject = FileObject;

export enum ESupabaseDB {
  blocks = "blocks",
  customers = "customers",
  subscriptions = "subscriptions",
  projects = "projects",
  instagramAccounts = "instagram_accounts",
  instagramPosts = "instagram_posts",
}

export const enum ESupabaseBucket {
  projectAvatar = "project-avatar",
  instagramAvatar = "instagram-avatar",
  instagramMedia = "instagram-media",
}
