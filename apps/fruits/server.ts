import fp, { FastifyInstance } from "fastify";
import postgres from "@fastify/postgres";
import { PoolClient } from "pg";
import { Plugins } from "./plugins";

const fastify = fp();
fastify.register(postgres, {
  connectionString: "postgres://postgres@localhost/postgres",
});
fastify.register(Plugins.db);
fastify.register(Plugins.userService);

fastify.listen({ port: 8082 }, (err: any) => {
  if (err) throw err;
  console.log(`server listening on ${8082}`);
});

export const fastifyInstance = fastify;
