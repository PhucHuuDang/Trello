import { z } from "zod";

import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CrateList } from "./schema";

export type InputType = z.infer<typeof CrateList>;

export type ReturnType = ActionState<InputType, List>;
