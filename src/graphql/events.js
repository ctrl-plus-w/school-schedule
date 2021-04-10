import { gql } from '@apollo/client';

export const EVENTS = gql`
  query Events {
    userEvents {
      id
      start
      link
      owner {
        id
        username
      }
      label {
        label_name
      }
      subject {
        subject_name
      }
    }
  }
`;

export const LABEL_EVENTS = gql`
  query Events($label_id: ID!) {
    labelEvents(label_id: $label_id) {
      id
      start
      link
      owner {
        id
        username
      }
      label {
        label_name
      }
      subject {
        subject_name
      }
    }
  }
`;
