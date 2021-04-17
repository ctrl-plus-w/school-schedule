import { gql } from 'graphql-request';

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

export const CREATE_EVENT = gql`
  mutation CreateEvent($start: String!, $link: String, $description: String!, $obligatory: Boolean!, $label_name: String!, $subject_name: String!) {
    createEventByName(
      input: { start: $start, link: $link, description: $description, obligatory: $obligatory, label_name: $label_name, subject_name: $subject_name }
    ) {
      id
      start
      link
      description
      owner {
        username
      }
      label {
        label_name
      }
      subject {
        subject_name
      }
      created_at
    }
  }
`;
