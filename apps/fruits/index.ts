import fp from "fastify";
import postgres from "@fastify/postgres";

const fastify = fp();
fastify.register(postgres, {
  connectionString: "postgres://postgres@localhost",
});

fastify.listen({ port: 8082 }, (err: any) => {
  if (err) throw err;
  console.log(`server listening on ${8082}`);
});

fastify.get<FruitRoute>("/fruit", async (req, reply) => {
  fastify.pg.query<Fruit>(
    "SELECT id, name, addedBy FROM fruits WHERE id=$1",
    [req.query.id],
    function onResult(err, result) {
      if (err) {
        throw reply.status(400).send({ error: err.message, data: null });
      }
      reply.status(200).send({ success: true, data: result.rows });
    },
  );
  return reply;
});

interface FruitRoute {
  Querystring: IQuerystring;
  Reply: IReply;
}

interface Fruit {
  id: string;
  name: string;
}
interface IQuerystring {
  id: string;
}

interface IReply {
  200: { success: boolean; data: Fruit[] };
  "4xx": { error: string; data: null };
}
