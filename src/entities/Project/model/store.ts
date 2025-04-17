import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { IProject } from "@entities/Project/model/types";

import { TNullable } from "@shared/types/common";

export interface IProjectStore {
  project: TNullable<IProject>;
  originalProject: TNullable<IProject>;
  setProject: (val: { withOriginal?: boolean; project: TNullable<IProject> }) => void;
  resetProject: () => void;
}

const useProjectStoreBase = create<IProjectStore>()(
  immer((set) => ({
    project: null as TNullable<IProject>,
    originalProject: null as TNullable<IProject>,
    setProject: ({ withOriginal, project }) => {
      set((state) => {
        if (withOriginal) {
          state.originalProject = project;
        }
        state.project = project;
      });
    },
    resetProject: () => {
      set((state) => {
        state.project = null;
        state.originalProject = null;
      });
    },
  }))
);

export const useProjectStore = <T>(selector: (state: IProjectStore) => T) => useProjectStoreBase(useShallow(selector));
