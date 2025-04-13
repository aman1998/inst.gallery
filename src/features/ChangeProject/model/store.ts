import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

import { IChangeProjectRequestData } from "@features/ChangeProject/model/types";

import { IDataDefault } from "@shared/types/request";
import { defaultData } from "@shared/constants/defaultValues";
import { ESupabaseDB } from "@shared/config/supabase/types";
import { createClient } from "@shared/config/supabase/client";

export interface IChangeProject {
  changeProject: IDataDefault<unknown>;
  changeProjectRequest: (data: IChangeProjectRequestData) => Promise<void>;
}

const useChangeProjectStoreBase = create<IChangeProject>()(
  immer((set) => ({
    changeProject: defaultData as IDataDefault<unknown>,
    changeProjectRequest: async ({ data, onFinallyCallback, onSuccessCallback, onErrorCallback }) => {
      try {
        set((state) => {
          state.changeProject.isLoading = true;
        });
        const supabase = createClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          onErrorCallback?.();
          return;
        }

        console.log("data ->", data);

        const { error, data: supabaseData } = await supabase
          .from(ESupabaseDB.projects)
          .update(data)
          .eq("email", user?.email)
          // .eq("user_id", user?.id)
          // .eq("id", data.id)
          .select();

        if (error) {
          onErrorCallback?.();
          return;
        }

        onSuccessCallback?.();
      } catch {
        onErrorCallback?.();
      } finally {
        set((state) => {
          state.changeProject.isLoading = false;
        });
        onFinallyCallback?.();
      }
    },
  }))
);

export const useChangeProjectStore = <T>(selector: (state: IChangeProject) => T) =>
  useChangeProjectStoreBase(useShallow(selector));
