import { gql } from 'graphql-request';

export const LABELS = gql`
  query {
    labels {
      id
      label_name
    }
  }
`;

export const CREATE_LABEL = gql`
  mutation CreateLabel($label_name: String!) {
    createLabel(input: { label_name: $label_name }) {
      id
      label_name
    }
  }
`;
