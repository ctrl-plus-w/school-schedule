import { gql } from 'graphql-request';

export const SUBJECTS = gql`
  query {
    subjects {
      id
      subject_name
      color
    }
  }
`;
