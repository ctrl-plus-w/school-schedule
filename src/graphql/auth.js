import { gql } from 'graphql-request';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      full_name
      token
      role

      subjects {
        id
        subject_name
      }

      labels {
        id
        label_name
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken {
    verifyToken {
      id
      full_name
      token
      role

      subjects {
        id
        subject_name
      }

      labels {
        id
        label_name
      }
    }
  }
`;
