import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { IInstagramDownloadedPost } from "@entities/Instagram/model/types";
import { EBlockType, IBlock } from "@entities/Block/model/types";

import { TNullable } from "@shared/types/common";

export interface ICreateBlock {
  step: number;
  setStep: (step: number) => void;

  createdBlock: TNullable<IBlock>;
  setCreatedBlock: (val: TNullable<IBlock>) => void;

  selectedPosts: IInstagramDownloadedPost[];
  setSelectedPosts: (selectedPosts: IInstagramDownloadedPost[]) => void;

  reset: () => void;
}

const useCreateBlockStoreBase = create<ICreateBlock>()(
  immer((set) => ({
    step: 1 as number,
    setStep: (step) => {
      set((state) => {
        state.step = step;
      });
    },

    createdBlock: null as TNullable<IBlock>,
    setCreatedBlock: (block) => {
      set((state) => {
        state.createdBlock = block;
      });
    },

    selectedPosts: [] as IInstagramDownloadedPost[],
    setSelectedPosts: (selectedPosts) => {
      set((state) => {
        state.selectedPosts = selectedPosts;
      });
    },

    reset: () => {
      set((state) => {
        state.step = 1;
        state.createdBlock = null;
        state.selectedPosts = [];
      });
    },
  }))
);

export const useCreateBlockStore = <T>(selector: (state: ICreateBlock) => T) =>
  useCreateBlockStoreBase(useShallow(selector));
