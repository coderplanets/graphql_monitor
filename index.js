require('dotenv').config()

const { ApolloEngineLauncher } = require('apollo-engine')

// Define the Engine configuration.
const launcher = new ApolloEngineLauncher({
  apiKey: process.env.APOLLO_KEY,
  cacheControl: true,
  origins: [
    {
      http: {
        /* url: 'http://localhost:4001/graphiql', */
        /* url: 'http://localhost:7001/graphiql', */
        /* url: 'http://apiraw.coderplanets.com/graphiql', */
        url: process.env.APOLLO_ORIGIN,
        overrideRequestHeaders: {
          /* origin: '*', */
          /* 'access-control-allow-origin': '*', */
          /* Host: 'apiraw.coderplanets.com', */
          Host: process.env.APOLLO_ORIGIN.split('//')[1],
          /* 'content-type': 'application/json;charset=utf-8', */
          /* Origin: 'http://localhost:3000',*/
          /* special: 'Special header value', */
          /* authorization: 'Bearer autk',*/
        },
      },
    },
  ],
  logging: {
    /* level: 'INFO', */
    /* level: 'ERROR', */
    /* level: 'DEBUG', */
    /* level: 'INFO', */
    level: 'WARN',
    request: {
      destination: 'STDOUT',
    },
    query: {
      destination: 'STDOUT',
    },
  },
  frontends: [
    {
      /* parse evn-var issue */
      /* host: process.env.APOLLO_FRONT_HOST, */
      /* host: 'http://devapi.coderplanets.com', */
      /* port: parseInt(process.env.APOLLO_FRONT_PORT.slice(1, -1)), */
      /* port: parseInt(process.env.APOLLO_FRONT_PORT), */
      /* host: 'devapiraw.coderplanets.com', */
      port: parseInt(process.env.APOLLO_FRONT_PORT),
      endpoints: ['/graphiql'],
      extensions: {
        // Extensions which will never be returned to clients.
        // Defaults to ['tracing'].
        blacklist: ['tracing', 'cacheControl'],
        // Extensions to only return to clients if the client requests
        // them.  Defaults to `['tracing', 'cacheControl']`.
        strip: ['tracing'],
      },
    },
  ],
})

// Start the Proxy; crash on errors.
launcher.start().catch(err => {
  throw err
})
