import { fastifyInstance } from "./server";

fastifyInstance.get<FruitRoute>("/fruit", async (req, reply) => {
  let frutis: Fruit[] | null = null;
  // Query Fruits
  try {
    const { rows } = await fastifyInstance.dbClient.query<Fruit>(
      "SELECT id, name, addedBy FROM fruits WHERE id=$1",
      [req.query.id],
    );
    frutis = rows;
  } catch (error) {
    console.log("DB Error: ", error);
  }

  if (!frutis?.length) {
    return reply
      .status(400)
      .send({ data: null, error: `No fruit found for ID {${req.query.id}}` });
  }

  const user = await fastifyInstance.USERS.fetchUser({ id: frutis[0].id });
  frutis[0].addedBy = user?.[0]?.name ?? "NO_NAME";
  reply.status(200).send({ success: true, data: frutis });
});

interface FruitRoute {
  Querystring: IQuerystring;
  Reply: IReply;
}

interface Fruit {
  id: string;
  name: string;
  addedBy: string;
}
interface IQuerystring {
  id: string;
}

interface IReply {
  200: { success: boolean; data: Fruit[] };
  "4xx": { error: string; data: null };
}
