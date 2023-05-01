import { create } from "zustand";
import { getUserInfo } from "../util/axios/basis";
import { createJSONStorage, persist } from "zustand/middleware";
export const useUserStore = create(
  persist(
    (set) => ({
      loginUserId: "",
      loginUserNickname: "",
      loginUserProfile: "",
      fetchLoginUser: async (userId) => {
        const result = await getUserInfo(userId);
        set({
          loginUserId: result.data.userId,
          loginUserNickname: result.data.userNickname,
          loginUserProfile: result.data.loginUserProfile,
        });
      },
      deleteEverything: () => set({}, true),
    }), 
    {
      name: "user", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
