import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:500/grapqhl';
const client = new GraphQLClient(endpoint);

export default client;
