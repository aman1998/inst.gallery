import { IBlockStore } from "@entities/Block/model/store";

export const blocksSelector = (state: IBlockStore) => state.blocks;
export const setBlocksSelector = (state: IBlockStore) => state.setBlocks;
export const addBlockSelector = (state: IBlockStore) => state.addBlock;
export const removeBlockSelector = (state: IBlockStore) => state.removeBlock;

export const selectedBlockSelector = (state: IBlockStore) => state.selectedBlock;
export const selectedOriginalBlockSelector = (state: IBlockStore) => state.selectedOriginalBlock;
export const setSelectedBlockSelector = (state: IBlockStore) => state.setSelectedBlock;
