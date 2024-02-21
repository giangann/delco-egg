import { atom } from "jotai";
import { IUserAtom } from "../shared/types/user";

const initialUser = null;

export const userAtom = atom<null | IUserAtom>(initialUser);
