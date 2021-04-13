import { gql } from '@apollo/client';

export const SUBJECTS = gql`
  query {
    subjects {
      id
      subject_name
    }
  }
`;
