import { InstagramStore } from "@entities/Instagram/model/store";

export const instagramInfoIsLoadingSelector = (state: InstagramStore) => state.instagramInfo.isLoading;
export const instagramInfoSelector = (state: InstagramStore) => state.instagramInfo.data;
export const getInstagramUserInfoSelector = (state: InstagramStore) => state.getInstagramUserInfo;
export const resetInstagramInfoSelector = (state: InstagramStore) => state.resetInstagramInfo;

export const instagramPostsLoadingSelector = (state: InstagramStore) => state.instagramPosts.isLoading;
export const instagramPostsSelector = (state: InstagramStore) => state.instagramPosts.data?.data;
export const instagramPostsPagingSelector = (state: InstagramStore) => state.instagramPosts.data?.paging;
export const getInstagramPostsSelector = (state: InstagramStore) => state.getInstagramPosts;
export const resetInstagramPostsSelector = (state: InstagramStore) => state.resetInstagramPosts;

export const instagramDownloadedPostsIsLoadingSelector = (state: InstagramStore) =>
  state.instagramDownloadedPosts.isLoading;
export const instagramDownloadedPostsSelector = (state: InstagramStore) => state.instagramDownloadedPosts.data;
export const getInstagramDownloadedPostsSelector = (state: InstagramStore) => state.getInstagramDownloadedPosts;
export const addInstagramDownloadedPostsInListSelector = (state: InstagramStore) =>
  state.addInstagramDownloadedPostsInList;
export const deleteInstagramDownloadedPostsInListSelector = (state: InstagramStore) =>
  state.deleteInstagramDownloadedPostsInList;
export const resetInstagramDownloaderPostsSelector = (state: InstagramStore) => state.resetInstagramDownloaderPosts;

export const accessTokenInstagramSelector = (state: InstagramStore) => state.accessToken;
export const setAccessTokenInstagramSelector = (state: InstagramStore) => state.setAccessToken;

export const isModalOpenSelector = (state: InstagramStore) => state.isModalOpen;
export const setIsModalOpenSelector = (state: InstagramStore) => state.setIsModalOpen;

export const carouselPostsSelector = (state: InstagramStore) => state.carouselPosts;
export const setCarouselPostsSelector = (state: InstagramStore) => state.setCarouselPosts;

export const selectedPostIndexSelector = (state: InstagramStore) => state.selectedPostIndex;
export const setSelectedPostIndexSelector = (state: InstagramStore) => state.setSelectedPostIndex;

export const initialCarouselSlideSelector = (state: InstagramStore) => state.initialCarouselSlide;
export const setInitialCarouselSlideSelector = (state: InstagramStore) => state.setInitialCarouselSlide;
