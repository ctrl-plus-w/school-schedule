import { gql } from '@apollo/client';

export const EVENTS = gql`
  query {
    userEvents {
      id
      start
      description
      obligatory
      link
      owner {
        id
        full_name
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

export const OWNED_EVENTS = gql`
  query {
    ownedEvents {
      id
      start
      description
      obligatory
      link
      owner {
        id
        full_name
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
      description
      obligatory
      link
      owner {
        id
        full_name
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
