import { IProject } from "@entities/Project/model/types";

import { IRequestCallbacks } from "@shared/types/request";

export interface IChangeProjectRequestData extends IRequestCallbacks<IProject> {
  data: Partial<IProject>;
}
