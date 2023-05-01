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
    }), //Cannot use 'in' operator to search for 'getStorage' in undefined. persist()안에 persiste option을 넣어야 왼쪽 오류가 나지 않는다.
    {
      name: "user", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
