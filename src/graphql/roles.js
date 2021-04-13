import { gql } from '@apollo/client';

export const ROLES = gql`
  query {
    roles {
      id
      role_name
    }
  }
`;
