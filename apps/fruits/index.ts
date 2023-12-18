import fastify from "fastify";

const server = fastify();

server.get("/fruits", async (request, reply) => {
  return "fruits\n";
});

server.listen({ port: 8081 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
