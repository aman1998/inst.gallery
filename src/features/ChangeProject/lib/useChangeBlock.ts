import { useDebouncedCallback } from "use-debounce";
import { useCallback } from "react";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { changeProjectIsLoadingSelector, changeProjectRequestSelector } from "@features/ChangeProject/model/selectors";
import { useChangeProjectStore } from "@features/ChangeProject/model/store";

import { useBlockStore } from "@entities/Block/model/store";
import {
  blocksSelector,
  selectedBlockSelector,
  setBlocksSelector,
  setSelectedBlockSelector,
} from "@entities/Block/model/selectors";
import { IBlock } from "@entities/Block/model/types";
import { TCustomizeBlocks } from "@entities/Block/model/customizeTypes";
import { useProjectStore } from "@entities/Project/model/store";
import { setProjectSelector } from "@entities/Project/model/selectors";
import { IProject } from "@entities/Project/model/types";

import { useMessage } from "@shared/hooks/useMessage";

export const useChangeBlock = () => {
  const blocks = useBlockStore(blocksSelector);
  const selectedBlock = useBlockStore(selectedBlockSelector);
  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const setBlocks = useBlockStore(setBlocksSelector);

  const changeBlockRequest = useChangeProjectStore(changeProjectRequestSelector);
  const isLoading = useChangeProjectStore(changeProjectIsLoadingSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { loadingMessage, successMessage, destroyMessage, errorMessage } = useMessage();
  const { isDemo } = useLKLayout();

  const handleValueChange = useDebouncedCallback((key: keyof IBlock, value: any) => {
    if (!selectedBlock) return;

    setSelectedBlock({
      block: {
        ...selectedBlock,
        [key]: value,
      },
    });
  }, 300);

  const handleCustomizeChange = useDebouncedCallback((key: keyof TCustomizeBlocks, value: any) => {
    if (!selectedBlock) return;

    setSelectedBlock({
      block: {
        ...selectedBlock,
        customization: { ...selectedBlock?.customization, [key]: value },
      },
    });
  }, 300);

  const changeBlock = () => {
    loadingMessage();
    const updatedBlocks = blocks.map((item) => (item.block_id !== selectedBlock?.block_id ? item : selectedBlock));

    const onSuccessCallback = (newProjectData?: IProject) => {
      destroyMessage();
      setSelectedBlock({ block: selectedBlock, withOriginal: true });
      setBlocks(updatedBlocks);
      successMessage("Successfully changed!");

      if (newProjectData) {
        setProject({ project: newProjectData, withOriginal: true });
      }
    };

    if (isDemo) {
      onSuccessCallback();
    } else {
      changeBlockRequest({
        data: {
          blocks: updatedBlocks,
        },
        onSuccessCallback,
        onErrorCallback: () => {
          destroyMessage();
          errorMessage("Failed to save!");
        },
      });
    }
  };

  return { isLoading, changeBlock, handleValueChange, handleCustomizeChange };
};
