import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://192.168.0.24:5000/graphql';
const client = new GraphQLClient(endpoint);

export default client;
