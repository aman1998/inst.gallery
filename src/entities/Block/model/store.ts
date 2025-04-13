import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { EBlockNavigation, EBlockType, IBlock } from "@entities/Block/model/types";

import { TNullable } from "@shared/types/common";

export interface IBlockStore {
  blocks: IBlock[];
  setBlocks: (val: IBlock[]) => void;
  addBlock: (block: IBlock) => void;
  removeBlock: (blockId: string) => void;

  selectedBlock: TNullable<IBlock>;
  selectedOriginalBlock: TNullable<IBlock>;
  setSelectedBlock: (val: TNullable<{ withOriginal?: boolean; block: TNullable<IBlock> }>) => void;
}

const useBlockStoreBase = create<IBlockStore>()(
  persist(
    immer((set) => ({
      blocks: [] as IBlock[],
      setBlocks: (val) => {
        set((state) => {
          state.blocks = val;
        });
      },
      addBlock: (block) => {
        set((state) => {
          state.blocks.push(block);
        });
      },
      removeBlock: (blockId) => {
        set((state) => {
          const currentBlock = state.blocks.findIndex((block) => block.block_id === blockId);
          if (currentBlock !== -1) {
            state.blocks.splice(currentBlock, 1);
          }
        });
      },

      selectedBlock: null as TNullable<IBlock>,
      selectedOriginalBlock: null as TNullable<IBlock>,
      setSelectedBlock: (val) => {
        if (!val) {
          set((state) => {
            state.selectedBlock = null;
          });
          return;
        }

        const { withOriginal, block } = val;
        set((state) => {
          if (withOriginal) {
            state.selectedOriginalBlock = block;
          }
          state.selectedBlock = block;
        });
      },
    })),
    {
      name: "widget-storage",
      partialize: (state) => ({
        // selectedBlock: state.selectedBlock,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useBlockStore = <T>(selector: (state: IBlockStore) => T) => useBlockStoreBase(useShallow(selector));
