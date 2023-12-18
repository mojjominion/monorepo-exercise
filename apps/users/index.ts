import fastify from "fastify";

const server = fastify();

server.get("/users", async (request, reply) => {
  return "Users\n";
});

server.listen({ port: 8082 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
