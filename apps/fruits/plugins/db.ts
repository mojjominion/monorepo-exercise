import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PoolClient } from "pg";

const dbPlugin: FastifyPluginAsync = fp(async (instance, _opts) => {
  const dbClient = await instance.pg.connect();

  instance.decorate("dbClient", dbClient);

  instance.addHook("onClose", async (server) => {
    server.dbClient.release();
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    dbClient: PoolClient;
  }
}

export default dbPlugin;
