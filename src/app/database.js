import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://school-schedule-backend.herokuapp.com/graphql';
const client = new GraphQLClient(endpoint);

export default client;
