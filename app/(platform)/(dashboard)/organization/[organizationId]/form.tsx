"use client";

import { createBoard } from "@/actions/create-board";

import { SubmitButton } from "./form-button";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.error(error);
    },
  });
  // console.log(fieldErrors);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="enter board title"
          className="border-black border p-1 "
        />
        {fieldErrors?.title ? (
          <div>
            {fieldErrors?.title.map((error: string) => (
              <p className="text-rose-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <SubmitButton />
    </form>
  );
};
