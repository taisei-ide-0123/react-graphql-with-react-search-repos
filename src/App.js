import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import { SEARCH_REPOSITORIES } from "./graphql";

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "graphql",
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>Hey!!</div>

      <Query query={SEARCH_REPOSITORIES} variables={{ ...VARIABLES }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log({ data });
          return <div></div>;
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
