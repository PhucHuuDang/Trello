import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./form-delete";

interface BoardProps {
  title: string;
  id: string;
}

const DeleteBoard = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board title: {title}</p>
      <DeleteButton />
    </form>
  );
};

export default DeleteBoard;
