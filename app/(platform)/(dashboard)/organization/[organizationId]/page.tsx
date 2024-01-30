import { db } from "@/lib/db";
import DeleteBoard from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {
  const data = await db.board.findMany();

  return (
    <div>
      <Form />
      <div>
        {data.map((item) => (
          <DeleteBoard key={item.id} title={item.title} id={item.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
