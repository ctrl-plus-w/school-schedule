import gql from 'graphql-tag';

export const USERS = gql`
  query {
    users {
      id
      username
      full_name
      labels {
        id
        label_name
      }
      subjects {
        id
        subject_name
      }
      role {
        role_name
      }
    }
  }
`;
