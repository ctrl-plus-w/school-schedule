import { gql } from 'graphql-request';

export const ROLES = gql`
  query {
    roles {
      id
      role_name
    }
  }
`;
