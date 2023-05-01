import { create } from "zustand";
import { getUserInfo } from "../util/axios/basis";
import { createJSONStorage, persist } from "zustand/middleware";
export const useBirthStore = create(
  persist(
    (set) => ({
      birth: "",
      changeBirth: (newBirth) =>
        set((state) => ({
          ...state, //if only one variables, u can delete this line.
          birth: newBirth,
        })),
    }), //Cannot use 'in' operator to search for 'getStorage' in undefined. persist()안에 persiste option을 넣어야 왼쪽 오류가 나지 않는다.
    {
      name: "birth", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
