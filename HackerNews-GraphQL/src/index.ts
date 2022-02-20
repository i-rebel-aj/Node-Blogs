import "graphql-import-node";
import { execute, parse } from "graphql";
import fastify from "fastify";
import morgan from "morgan";
import { FastifyRequest, FastifyReply } from "fastify";
import { getGraphQLParameters, processRequest, Request, renderGraphiQL, shouldRenderGraphiQL, sendResult } from "graphql-helix";
import { schema } from "./schema";
morgan("tiny");
async function main() {
  const server = fastify({
    // logger: true
  });
  server.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ message: "Success" });
  });
  server.route({
    method: ["POST", "GET"],
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      };

      if (shouldRenderGraphiQL(request)) {
        reply.header("Content-Type", "text/html");
        reply.send(
          renderGraphiQL({
            endpoint: "/graphql",
          })
        );

        return;
      }

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        query,
        variables,
      });

      sendResult(result, reply.raw);
    }
  });
  server.listen(3000, () => {
    console.log("Server Listening to port 3000");
  });
}

main();
