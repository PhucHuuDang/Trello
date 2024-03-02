import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Card's content is required",
      invalid_type_error: "Card's content is required",
    })
    .min(3, {
      message: "Card's content is too short",
    }),
  boardId: z.string(),
  listId: z.string(),
});
