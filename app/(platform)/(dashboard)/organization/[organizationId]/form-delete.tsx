"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const DeleteButton = () => {
  const { pending } = useFormStatus();
  //   console.log(pending);

  return (
    <Button disabled={pending} type="submit" variant="destructive" size="sm">
      Delete
    </Button>
  );
};
