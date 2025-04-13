import React from "react";
import { customAlphabet } from "nanoid";
import { useDebouncedCallback } from "use-debounce";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";
import { ELKLayoutNavigation } from "@widgets/layouts/LKLayout/model/types";

import { useCreateBlockStore } from "@features/Block/CreateBlock/model/store";
import {
  createBlockResetSelector,
  createBlockSetSelectedPostsSelector,
  createdBlockSelector,
  setCreatedBlockSelector,
} from "@features/Block/CreateBlock/model/selectors";

import { IBlock } from "@entities/Block/model/types";
import { useBlockStore } from "@entities/Block/model/store";
import { addBlockSelector, blocksSelector, setSelectedBlockSelector } from "@entities/Block/model/selectors";
import { IProject } from "@entities/Project/model/types";
import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector, setProjectSelector } from "@entities/Project/model/selectors";
import { TCustomizeBlock, TCustomizeBlocks } from "@entities/Block/model/customizeTypes";

import { ESupabaseDB } from "@shared/config/supabase/types";
import { PRIMARY_COLOR } from "@shared/providers/AntdProvider/AntdProvider";
import { PROJECT_DEFAULT_NAME, SITE_DESCRIPTION } from "@shared/config/appConfig";
import { createClient } from "@shared/config/supabase/client";
import { useMessage } from "@shared/hooks/useMessage";

export const useCreateBlock = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const setPosts = useCreateBlockStore(createBlockSetSelectedPostsSelector);
  const createdBlock = useCreateBlockStore(createdBlockSelector);
  const setCreatedBlock = useCreateBlockStore(setCreatedBlockSelector);

  const setSelectedBlock = useBlockStore(setSelectedBlockSelector);
  const addBlock = useBlockStore(addBlockSelector);
  const blocks = useBlockStore(blocksSelector);

  const project = useProjectStore(projectSelector);
  const setProject = useProjectStore(setProjectSelector);

  const { loadingMessage, errorMessage, successMessage, destroyMessage } = useMessage();
  const { setNavigation, isDemo } = useLKLayout();

  const handleCreateChange = useDebouncedCallback((key: keyof TCustomizeBlocks, value: any) => {
    if (!createdBlock) return;

    setCreatedBlock({
      ...createdBlock,
      customization: { ...createdBlock?.customization, [key]: value },
    });
  }, 300);

  const resetCreatedBlockCustomization = useDebouncedCallback((customization: any) => {
    if (!createdBlock) return;

    setCreatedBlock({ ...createdBlock, customization });
  }, 300);

  const handleCreate = React.useCallback(
    async (supabase: any, block: IBlock, email?: string) => {
      const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 20);
      const defaultLink = nanoid();

      const { error: e, data } = await supabase
        .from(ESupabaseDB.projects)
        .insert(
          [
            {
              blocks: [...blocks, block],
              email,
              instagram_id: null,
              primary_color: PRIMARY_COLOR,
              meta: {
                title: PROJECT_DEFAULT_NAME,
                description: SITE_DESCRIPTION,
              },
              link: defaultLink,
            },
          ]
          // { onConflict: "email" }
        )
        .select();

      return { e, data };
    },
    [blocks]
  );

  const handleUpdate = async (supabase: any, block: IBlock, email?: string) => {
    const { error: e, data } = await supabase
      .from(ESupabaseDB.projects)
      .update({
        blocks: [...blocks, block],
      })
      .eq("email", email)
      .select();

    return { e, data };
  };

  const handleConfirm = async (customization: TCustomizeBlock) => {
    try {
      setIsLoading(true);
      loadingMessage("Creating in process");

      if (isDemo) {
        setIsLoading(false);
        destroyMessage();

        successMessage("Successfully created");
        setPosts([]);
        setNavigation(ELKLayoutNavigation.sub);

        if (createdBlock) {
          addBlock(createdBlock);
          setSelectedBlock({ block: createdBlock, withOriginal: true });
        }
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user || !createdBlock) throw new Error("Failed to retrieve user");

      const { data: projects, error: checkError } = await supabase
        .from(ESupabaseDB.projects)
        .select("*")
        .eq("user_id", user.id);

      const block: IBlock = { ...createdBlock, created_at: new Date(), customization };

      const action = !!projects?.length ? handleUpdate : handleCreate;
      const { e, data } = await action(supabase, block, user?.email);

      setIsLoading(false);
      destroyMessage();

      if (e) {
        errorMessage(e.message);
        return;
      }

      successMessage("Successfully created");
      setPosts([]);
      setNavigation(ELKLayoutNavigation.sub);

      const projectData = data[0] as IProject;
      const { blocks: projectBlocks } = projectData;

      if (!project) {
        setProject({ withOriginal: true, project: projectData });
      }

      if (projectBlocks?.length) {
        addBlock(projectBlocks[projectBlocks.length - 1]);
        setSelectedBlock({ block: projectBlocks[projectBlocks.length - 1], withOriginal: true });
      }
    } catch (err: any) {
      setIsLoading(false);
      destroyMessage();
      errorMessage(err.message || "An unexpected error occurred");
    }
  };

  return {
    handleConfirm,
    handleCreateChange,
    resetCreatedBlockCustomization,
    isLoading,
  };
};
