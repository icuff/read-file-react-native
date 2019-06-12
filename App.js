import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, ToastAndroid, PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import moment from 'moment';

export default class App extends Component {
  state = {
    fileContent: null,
    showReadBtn: true
  }

  requestPermission() {
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read external storage');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  readFile = async () => {
    const timerBegin = moment().valueOf();
    this.requestPermission();
    downloadDir = RNFS.ExternalStorageDirectoryPath + '/Download/';
    RNFS.readFile(downloadDir + 'testReactNative.txt', 'ascii').then(content => {
      this.setState({
        fileContent: content,
        showReadBtn: false
      });
      const timerEnd = moment().valueOf();
      ToastAndroid.show('Finished in ' + (timerEnd - timerBegin) + 'ms', ToastAndroid.LONG);
    }).catch(err => {
      ToastAndroid.show(err.message + ' - ' + err.code, ToastAndroid.SHORT);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.showReadBtn &&
          <Button
            onPress={this.readFile}
            title="Read File"
            color="#841584"
          />
        }
        <Text>{this.state.fileContent}</Text>
      </View>
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
