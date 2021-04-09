import gql from 'graphql-tag';

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
