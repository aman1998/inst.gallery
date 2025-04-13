import { useDebouncedCallback } from "use-debounce";

import { useLKLayout } from "@widgets/layouts/LKLayout/lib/useLKLayout";

import { changeProjectIsLoadingSelector, changeProjectRequestSelector } from "@features/ChangeProject/model/selectors";
import { useChangeProjectStore } from "@features/ChangeProject/model/store";

import { useProjectStore } from "@entities/Project/model/store";
import { projectSelector, setProjectSelector } from "@entities/Project/model/selectors";
import { TProjectInfo } from "@entities/Project/model/types";

import { useMessage } from "@shared/hooks/useMessage";

export const useChangeProject = () => {
  const project = useProjectStore(projectSelector);
  const setProject = useProjectStore(setProjectSelector);

  const changeProjectRequest = useChangeProjectStore(changeProjectRequestSelector);
  const isLoading = useChangeProjectStore(changeProjectIsLoadingSelector);

  const { loadingMessage, successMessage, destroyMessage, errorMessage } = useMessage();
  const { isDemo } = useLKLayout();

  const handleValueChange = useDebouncedCallback((key: keyof TProjectInfo, value: any) => {
    if (!project) return;

    setProject({
      project: {
        ...project,
        [key]: value,
      },
    });
  }, 300);

  const changeBlock = () => {
    if (!project) return;

    if (isDemo) {
      setProject({ project, withOriginal: true });
      successMessage("Successfully changed!");
      return;
    }

    loadingMessage();
    changeProjectRequest({
      data: project,
      onSuccessCallback: () => {
        destroyMessage();
        setProject({ project, withOriginal: true });
        successMessage("Successfully changed!");
      },
      onErrorCallback: () => {
        destroyMessage();
        errorMessage("Failed to save!");
      },
    });
  };

  return { isLoading, changeBlock, handleValueChange };
};
