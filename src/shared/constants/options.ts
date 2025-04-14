import { EPostsListType } from "@entities/Block/model/customizeTypes";

export const HEADLINE_OPTIONS = [
  { label: "H1", value: 1 },
  { label: "H2", value: 2 },
  { label: "H3", value: 3 },
  { label: "H4", value: 4 },
  { label: "H5", value: 5 },
];

export const ALIGN_ITEMS_OPTIONS = [
  { label: "Start", value: "flex-start" },
  { label: "Center", value: "center" },
  { label: "End", value: "flex-end" },
];

export const BUTTON_TYPE_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Primary", value: "primary" },
  { label: "Dashed", value: "dashed" },
  { label: "Link", value: "link" },
  { label: "Text", value: "text" },
];

export const BUTTON_SIZE_OPTIONS = [
  { label: "Small", value: "small" },
  { label: "Middle", value: "middle" },
  { label: "Large", value: "large" },
];

export const BUTTON_TAB_OPTIONS = [
  { label: "New tab", value: "new" },
  { label: "Current", value: "current" },
];

export const POSTS_TYPE_OPTIONS = [
  // { label: "Gallery", value: EPostsListType.gallery },
  { label: "Grid", value: EPostsListType.grid },
  { label: "Masonry", value: EPostsListType.masonry },
];

export const POSTS_LENGTH_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

export const GAP_OPTIONS = [
  { value: 0, label: "None" },
  { value: 6, label: "Small" },
  { value: 12, label: "Middle" },
  { value: 24, label: "Large" },
];
