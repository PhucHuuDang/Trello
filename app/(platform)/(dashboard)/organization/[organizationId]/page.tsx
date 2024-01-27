import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const OrganizationIdPage = async () => {
  const data = await db.board.findMany();

  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="enter board title"
          className="border-black border p-1 "
        />
        <Button type="submit">Submit</Button>
      </form>

      {/* <div>
        {data.map((item) => (
          <div key={item.id}>title: {item.title}</div>
        ))}
      </div> */}
    </div>
  );
};

export default OrganizationIdPage;
