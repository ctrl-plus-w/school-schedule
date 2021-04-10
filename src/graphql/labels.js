import { gql } from '@apollo/client';

export const LABELS = gql`
  query Labels {
    labels {
      id
      label_name
    }
  }
`;
