"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string[];
  };
  message?: string | null;
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required!",
  }),
});

export async function create(prevState: State, formData: FormData) {
  //const title = formData.get("title") as string; // this get the name of input

  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: validatedFields.error.flatten().fieldErrors
        ? "Missing fields"
        : null,
    };
  }

  const { title } = validatedFields.data;
  //   console.log(title);

  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      message: "Database Error",
    };
  }
  // when we create a data, it will be updated
  revalidatePath("/organization/org_2bPVNpqzhHwCeORwXQ6G8w2OyiB");
  redirect("/organization/org_2bPVNpqzhHwCeORwXQ6G8w2OyiB");
}
