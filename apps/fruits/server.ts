import fp from "fastify";
import postgres from "@fastify/postgres";
import { Plugins } from "./plugins";
import { CONFIG } from "configs";

const fastify = fp();
fastify.register(postgres, { connectionString: CONFIG.DB_URL });
fastify.register(Plugins.db);
fastify.register(Plugins.userService);

fastify.listen({ port: 8082 }, (err: any) => {
  if (err) throw err;
  console.log(`server listening on ${8082} ${process.env.DATABASE_URL}`);
});

export const fastifyInstance = fastify;
