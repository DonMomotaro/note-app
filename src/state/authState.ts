import { atom } from "recoil";

export const tokenState = atom({
  key: "accessToken",
  default: "",
});
