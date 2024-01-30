"use client";

import { create } from "@/actions/create-board";
import { useFormState } from "react-dom";
import { SubmitButton } from "./form-button";

export const Form = () => {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(create, initialState);

  console.log(state);
  // console.log(dispatch);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="enter board title"
          className="border-black border p-1 "
        />
        {state?.errors?.title ? (
          <div>
            {state.errors.title.map((error: string) => (
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
