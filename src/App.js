import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import client from "./client";
import { ME } from "./graphql";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>Hey!!</div>

      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return <div>{data.user.name}</div>;
        }}
      </Query>
    </ApolloProvider>
  );
};

export default App;
