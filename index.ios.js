import React from 'react';
import { AppRegistry } from 'react-native';
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './src/app';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/civ0vd7hs12j90113l9p8bpi7' })
});

const Yardsale = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

AppRegistry.registerComponent('yardsale', () => Yardsale);
