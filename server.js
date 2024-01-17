const { ApolloServer } = require("@apollo/server");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const port = 4000;
const cors = require("cors");
const { json } = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");

const loadedFiles = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const loadedResolvers = loadFilesSync(
  path.join(__dirname, "**/*.resolvers.js")
);

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers,
  });

  const server = new ApolloServer({ schema });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.listen(port, () => {
    console.log(`Running a GraphQL API server...`);
  });
}

startApolloServer();

// const root = {
//   posts: require("./posts/posts.model"),
//   comments: require("./comments/comments.model"),
// };

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: schema,
//     // rootValue: root,
//     graphiql: true,
//   })
// );

// app.listen(port, () => {
//   console.log(
//     `Running a GraphQL API server at http://localhost:${port}/graphql`
//   );
// });
