import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import {
  IInstagramDownloadedPost,
  IInstagramMediaResponseData,
  IInstagramPost,
  IInstagramUserInfo,
} from "@entities/Instagram/model/types";

import { TNullable } from "@shared/types/common";
import { IDataDefault, IRequestCallbacks } from "@shared/types/request";
import { defaultData } from "@shared/constants/defaultValues";
import { ROUTES } from "@shared/config/routes";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { createClient } from "@shared/config/supabase/client";

export interface InstagramStore {
  instagramInfo: IDataDefault<IInstagramUserInfo>;
  getInstagramUserInfo: (slug: string) => Promise<void>;
  resetInstagramInfo: () => void;

  instagramPosts: IDataDefault<IInstagramMediaResponseData>;
  getInstagramPosts: (slug: string, after?: string) => Promise<void>;
  resetInstagramPosts: () => void;

  instagramDownloadedPosts: IDataDefault<IInstagramDownloadedPost[]>;
  getInstagramDownloadedPosts: (slug: string, limit: number, callbacks?: IRequestCallbacks) => Promise<void>;
  addInstagramDownloadedPostsInList: (post: IInstagramDownloadedPost) => void;
  deleteInstagramDownloadedPostsInList: (id: string) => void;
  resetInstagramDownloaderPosts: () => void;

  accessToken: TNullable<string>;
  setAccessToken: (val: TNullable<string>) => void;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;

  carouselPosts: IInstagramPost[] | IInstagramDownloadedPost[];
  setCarouselPosts: (val: IInstagramPost[] | IInstagramDownloadedPost[]) => void;

  selectedPostIndex: TNullable<number>; // Выбранный в настройках пост, не в блоке
  setSelectedPostIndex: (val: TNullable<number>) => void;

  initialCarouselSlide: TNullable<number>;
  setInitialCarouselSlide: (val: TNullable<number>) => void;
}

const useInstagramStoreBase = create<InstagramStore>()(
  devtools(
    immer((set) => ({
      instagramInfo: { ...defaultData, isLoading: true } as IDataDefault<IInstagramUserInfo>,
      getInstagramUserInfo: async (slug) => {
        try {
          set((state) => {
            state.instagramInfo.isLoading = true;
          });
          const response = await fetch(`${ROUTES.apiInstagramInfoId(slug)}`, {
            cache: "no-store",
          });
          const data = await response.json();

          if (data?.error) {
            return;
          }

          set((state) => {
            state.instagramInfo.data = data;
          });
        } catch {
        } finally {
          set((state) => {
            state.instagramInfo.isLoading = false;
          });
        }
      },
      resetInstagramInfo: () => {
        set((state) => {
          state.instagramInfo = { ...defaultData, isLoading: true };
        });
      },

      instagramPosts: { ...defaultData, isLoading: true } as IDataDefault<IInstagramMediaResponseData>,
      getInstagramPosts: async (slug, after) => {
        try {
          set((state) => {
            state.instagramPosts.isLoading = true;
          });
          const response = await fetch(`${ROUTES.apiInstagramPostsId(slug)}?after=${after ?? ""}`, {
            cache: "no-store",
          });
          const data = await response.json();

          if (data?.error) {
            return;
          }

          set((state) => {
            if (after && state.instagramPosts.data) {
              state.instagramPosts.data.data = [...state.instagramPosts.data.data, ...data?.data];
              state.instagramPosts.data.paging = data?.paging;
            } else {
              state.instagramPosts.data = data;
            }
          });
        } catch {
        } finally {
          set((state) => {
            state.instagramPosts.isLoading = false;
          });
        }
      },
      resetInstagramPosts: () => {
        set((state) => {
          state.instagramPosts = { ...defaultData, isLoading: true };
        });
      },

      instagramDownloadedPosts: { ...defaultData, isLoading: true } as IDataDefault<IInstagramDownloadedPost[]>,
      getInstagramDownloadedPosts: async (slug, limit, callbacks) => {
        try {
          set((state) => {
            state.instagramDownloadedPosts.isLoading = true;
          });
          const supabase = createClient();

          const { data, error } = await supabase
            .from(ESupabaseDB.instagramPosts)
            .select("*")
            .eq("user_id", slug)
            .limit(limit);

          if (error) {
            callbacks?.onErrorCallback?.(error.message);
            return;
          }

          set((state) => {
            state.instagramDownloadedPosts.data = data;
          });
          callbacks?.onSuccessCallback?.();
        } catch {
          callbacks?.onErrorCallback?.();
        } finally {
          set((state) => {
            state.instagramDownloadedPosts.isLoading = false;
          });
        }
      },
      addInstagramDownloadedPostsInList: (post) => {
        set((state) => {
          if (!state.instagramDownloadedPosts.data) return;
          const currentIndex = state.instagramDownloadedPosts?.data.findIndex((item) => item.id === post.id);

          if (currentIndex !== -1) {
            state.instagramDownloadedPosts.data.splice(currentIndex, 1, post);
          } else {
            state.instagramDownloadedPosts.data.push(post);
          }
        });
      },
      deleteInstagramDownloadedPostsInList: (id) => {
        set((state) => {
          if (!state.instagramDownloadedPosts.data) return;
          const currentIndex = state.instagramDownloadedPosts?.data.findIndex((item) => item.id === id);

          if (currentIndex !== -1) {
            state.instagramDownloadedPosts.data.splice(currentIndex, 1);
          }
        });
      },
      resetInstagramDownloaderPosts: () => {
        set((state) => {
          state.instagramPosts = { ...defaultData, isLoading: true };
        });
      },

      accessToken: null as TNullable<string>,
      setAccessToken: (val) => {
        set((state) => {
          state.accessToken = val;
        });
      },

      isModalOpen: false as boolean,
      setIsModalOpen: (isModalOpen) => {
        set((state) => {
          state.isModalOpen = isModalOpen;
        });
      },

      carouselPosts: [] as IInstagramPost[],
      setCarouselPosts: (val) => {
        set((state) => {
          state.carouselPosts = val;
        });
      },

      selectedPostIndex: null as TNullable<number>,
      setSelectedPostIndex: (selectedPost) => {
        set((state) => {
          state.selectedPostIndex = selectedPost;
        });
      },

      initialCarouselSlide: null as TNullable<number>,
      setInitialCarouselSlide: (val) => {
        set((state) => {
          state.initialCarouselSlide = val;
        });
      },
    }))
  )
);

export const useInstagramStore = <T>(selector: (state: InstagramStore) => T) =>
  useInstagramStoreBase(useShallow(selector));
