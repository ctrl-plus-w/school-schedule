import { gql } from '@apollo/client';

export const LABELS = gql`
  query {
    labels {
      id
      label_name
    }
  }
`;
