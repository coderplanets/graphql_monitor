require('dotenv').config()

const { ApolloEngineLauncher } = require('apollo-engine')

// Define the Engine configuration.
const launcher = new ApolloEngineLauncher({
  apiKey: process.env.APOLLO_KEY,
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
    level: 'ERROR',
    /*
    request: {
      destination: 'STDOUT',
    },
    query: {
      destination: 'STDOUT',
    },
    */
  },
  // Resize the default in-memory cache.
  stores: [
    {
      inMemory: {
        cacheSize: 104857600, // 100 MB; defaults to 50MB.
      },
    },
  ],
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
      /* overrideGraphqlResponseHeaders: { */
      /* 'Access-Control-Allow-Origin': '*', */
      /* special: 'Special header value', */
      /* }, */
    },
  ],
})

// Start the Proxy; crash on errors.
launcher.start().catch(err => {
  throw err
})
