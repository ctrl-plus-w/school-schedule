import { gql } from 'graphql-request';

export const EVENTS = gql`
  query Events($start: String!, $end: String!) {
    userEvents(start: $start, end: $end) {
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
  query Events($start: String!, $end: String!) {
    ownedEvents(start: $start, end: $end) {
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
  query Events($id: ID!, $start: String!, $end: String!) {
    labelEvents(id: $id, start: $start, end: $end) {
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
  query Events($id: ID!, $start: String!, $end: String!) {
    labelRelatedEvents(id: $id, start: $start, end: $end) {
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

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $description: String, $link: String, $obligatory: Boolean) {
    updateEvent(id: $id, description: $description, link: $link, obligatory: $obligatory)
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
