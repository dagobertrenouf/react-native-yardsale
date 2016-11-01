/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Relay, {
  DefaultNetworkLayer,
  RootContainer
} from 'react-relay';
import Reindex from 'reindex-js';
import TodoList, { TodoListRoute }  from './todoList';
import config from './config';

const reindex = new Reindex(config.REINDEX_URL);

Relay.injectNetworkLayer(reindex.getRelayNetworkLayer());

export default class yardsale extends Component {
  render() {
    return (
      <RootContainer
        Component={TodoList}
        route={new TodoListRoute()}
        renderLoading={() => <ActivityIndicator/>}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('yardsale', () => yardsale);
