import { ICreateBlock } from "./store";

export const createBlockStepSelector = (state: ICreateBlock) => state.step;
export const createBlockSetStepSelector = (state: ICreateBlock) => state.setStep;

export const createdBlockSelector = (state: ICreateBlock) => state.createdBlock;
export const setCreatedBlockSelector = (state: ICreateBlock) => state.setCreatedBlock;

export const createBlockSelectedPostsSelector = (state: ICreateBlock) => state.selectedPosts;
export const createBlockSetSelectedPostsSelector = (state: ICreateBlock) => state.setSelectedPosts;

export const createBlockResetSelector = (state: ICreateBlock) => state.reset;
