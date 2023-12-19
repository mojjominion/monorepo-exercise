import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import axios from "axios";

interface User {
  id: string;
  name: string;
}

async function fetchUser(user: { id: string }) {
  try {
    const response = await axios.request<{ data: User[] }>({
      method: "GET",
      url: `http://127.0.0.1:8081/user\?id=${user.id}`,
    });
    if (response) {
      return response.data.data;
    }
  } catch (error) {
    console.log("AXIOS ERROR: ", error);
  }
}

const userServicePlugin: FastifyPluginAsync = fp(async (instance, _opts) => {
  const USERS = { fetchUser: fetchUser };
  instance.decorate("USERS", USERS);
});

declare module "fastify" {
  export interface FastifyInstance {
    USERS: { fetchUser: typeof fetchUser };
  }
}

export default userServicePlugin;
