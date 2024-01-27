"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CreateBoard = z.object({
  title: z.string(),
});

export async function create(formData: FormData) {
  //const title = formData.get("title") as string; // this get the name of input

  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });

  //   console.log(title);

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath("/organization/org_2bPVNpqzhHwCeORwXQ6G8w2OyiB");
}
