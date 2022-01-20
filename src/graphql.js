import gql from "graphql-tag";

export const ME = gql`
  query me {
    user(login: "taisei-ide-0123") {
      name
      avatarUrl
    }
  }
`;
