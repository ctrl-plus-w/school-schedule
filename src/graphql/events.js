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
        color
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
        color
      }
    }
  }
`;

export const LABEL_EVENTS = gql`
  query Events($id: ID!) {
    labelEvents(id: $id) {
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
        color
      }
    }
  }
`;

export const LABEL_RELATED_EVENTS = gql`
  query Events($id: ID!) {
    labelRelatedEvents(id: $id) {
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
        color
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($start: String!, $link: String, $description: String!, $obligatory: Boolean!, $label_id: ID!, $subject_id: ID!) {
    createEvent(
      input: { start: $start, link: $link, description: $description, obligatory: $obligatory, label_id: $label_id, subject_id: $subject_id }
    ) {
      id
      start
      link
      description
      owner {
        id
        full_name
      }
      label {
        label_name
      }
      subject {
        subject_name
        color
      }
      created_at
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
