import { gql } from 'graphql-request';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      full_name
      token
      role
      token_expiration
    }
  }
`;
