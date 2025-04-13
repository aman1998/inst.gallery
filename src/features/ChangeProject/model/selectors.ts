import { IChangeProject } from "@features/ChangeProject/model/store";

export const changeProjectIsLoadingSelector = (state: IChangeProject) => state.changeProject.isLoading;
export const changeProjectRequestSelector = (state: IChangeProject) => state.changeProjectRequest;
