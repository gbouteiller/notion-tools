import type {z} from "zod";
import {databaseFrom} from "../utils";
import {zDatabase as zIDatabase} from "./input";

// MAIN ====================================================================================================================================
export const zDatabase = zIDatabase.transform(databaseFrom);
export type Database = z.infer<typeof zDatabase>;