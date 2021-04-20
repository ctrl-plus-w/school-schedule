import { gql } from 'graphql-request';

export const LABELS = gql`
  query {
    labels {
      id
      label_name
    }
  }
`;
