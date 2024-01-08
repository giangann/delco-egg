import { atom } from "jotai";

const initialUser = null;

export const userAtom = atom<null | any>(initialUser);
