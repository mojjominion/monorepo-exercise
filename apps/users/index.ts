import fp from "fastify";
import postgres from "@fastify/postgres";
import { CONFIG } from "configs";

const fastify = fp();
fastify.register(postgres, { connectionString: CONFIG.DB_URL });

fastify.listen({ port: 8081 }, (err: any) => {
  if (err) throw err;
  console.log(`server listening on ${8081}`);
});

fastify.get<UserRoute>("/user", async (req, reply) => {
  fastify.pg.query<User>(
    "SELECT id, name FROM users WHERE id=$1",
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

interface UserRoute {
  Querystring: IQuerystring;
  Reply: IReply;
}

interface User {
  id: string;
  name: string;
}
interface IQuerystring {
  id: string;
}

interface IReply {
  200: { success: boolean; data: User[] };
  "4xx": { error: string; data: null };
}
