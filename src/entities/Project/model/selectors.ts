import { IProjectStore } from "@entities/Project/model/store";

export const projectSelector = (state: IProjectStore) => state.project;
export const originalProjectSelector = (state: IProjectStore) => state.originalProject;
export const setProjectSelector = (state: IProjectStore) => state.setProject;
export const resetProjectSelector = (state: IProjectStore) => state.resetProject;
