import React from "react";
import { type ButtonProps } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ButtonType } from "antd/es/button/buttonHelpers";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";

export type TCustomizeBlocks = ICustomizeBlock1 &
  ICustomizeBlock4;

export type TCustomizeBlock = ICustomizeBlock1 | ICustomizeBlock2 | ICustomizeBlock4

// BLOCK 1
export interface ICustomizeBlock1 extends ICustomizeImage, ICustomizeHeader {
  advancedSettings: ICustomizeAdvanced;
  buttonSettings: ICustomizeButton;

  posts: IInstagramDownloadedPost[];
  postsSettings: ICustomizePosts;
}

// BLOCK 2
export interface ICustomizeBlock2 extends ICustomizeImage {
  posts: IInstagramDownloadedPost[];
  postsSettings: ICustomizePosts;
}


// BLOCK 4
export interface ICustomizeBlock4 extends ICustomizeHeader {
  advancedSettings: ICustomizeAdvanced;
  buttonSettings: ICustomizeButton;

  items: object[];
  itemsStyle: React.CSSProperties;
}


export interface ICustomizeImage {
  imageWrapperStyle: Pick<React.CSSProperties, "borderRadius">;
  imageStyle: React.CSSProperties;
}

export interface ICustomizeHeader {
  headerStyle: Pick<React.CSSProperties, "alignItems">;
  title: string;
  titleLevel: 1 | 2 | 3 | 4 | 5;
  subtitle: string;
}

export interface ICustomizeButton {
  buttonVisible: boolean;
  buttonText: string;
  buttonLink: string;
  buttonColor: string;
  buttonTab: "new" | "current";
  buttonStyle?: React.CSSProperties;
  buttonSize: SizeType;
  buttonType: ButtonType;
  buttonWithArrow: boolean;
}

export interface ICustomizeAdvanced {
  bgColor: string;
  withBg: boolean;
  textColor: string;
  isReverse: boolean;
  isColumn: boolean;
}

export interface ICustomizePosts {
  postsLength: number;
  postsType: EPostsListType;
  postsStyle: Pick<React.CSSProperties, "gap">;
}

export const enum EPostsListType {
  grid = "grid",
  gallery = "gallery",
  masonry = "masonry",
}
