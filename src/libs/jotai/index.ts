import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { CartType } from "@/types/product.type";

import { UserSession } from "../../types/session.type";

// export const sessionAtom = atom<Promise<Session | null>>(async () => {
//   try {
//     const res = await axios.get(`${serverURL}api/session.php`);

//     console.log(res.data);
//     if (res.data === "NO_SESSION") {
//       return null;
//     }

//     return { user: { name: "test", email: "test@mail.com", username: "test" } };
//   } catch (err) {
//     return null;
//   }
// });

// export const userSession

// export const sessionLoadableAtom = loadable(sessionAtom);

export const isNProgressIsAnimatingAtom = atom<boolean>(false);

const userStorage = createJSONStorage<UserSession | null>(() => sessionStorage);
export const userSessionAtom = atomWithStorage<UserSession | null>(
  "user-session",
  null,
  userStorage
);

const localCartStorage = createJSONStorage<CartType>(() => localStorage);
export const localCartAtom = atomWithStorage<CartType>(
  "user-cart",
  { products: [] },
  localCartStorage
);
