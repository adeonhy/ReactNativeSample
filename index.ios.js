/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

export default class ReactNativeSample extends Component {
  state = {
    events: []
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('https://connpass.com/api/v1/event/?keyword_or=react')
      .then(res => res.json())
      .then(data => this.setState({events: data.events}))
      .catch(console.error)
  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.events.length != 0 ?
            <ConnpassEventListView events={this.state.events} />
          : <Text>Loading...</Text>}
      </View>
    );
  }
}

class ConnpassEventListView extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    this.dataSource = ds.cloneWithRows(props.events)
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <Text style={styles.title}>
          {rowData.title}
        </Text>
        <Text style={styles.info}>
          日時: {rowData.started_at}
        </Text>
        <Text style={styles.info}>
          場所: {rowData.place}
        </Text>
        <Text style={styles.description}>
          {deleteHTMLTags(rowData.description)}
        </Text>
      </View>
    )
  }

  _renderSeparator(sectionID, rowID) {
    return (
      <View 
      key={`${sectionID}-${rowID}`}
      style={{
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 10
      }}
        />
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    fontSize: 14,
    margin: 10,
  },
  info: {
    fontSize: 10,
    marginLeft: 10,
    color: '#333333',
  },
  description: {
    fontSize: 12,
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const deleteHTMLTags = (html) => html.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')

AppRegistry.registerComponent('ReactNativeSample', () => ReactNativeSample);
