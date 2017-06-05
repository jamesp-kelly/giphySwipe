import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
} from 'react-native';

class SettingsView extends Component {

  static navigationOptions = {
    title: 'Settings',
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.swipeContainer}>
          <View style={styles.box}>
            <Text style={styles.text}>Settings</Text>
          </View>  
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  swipeContainer: {
    height: '80%',
    backgroundColor: 'yellow',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    backgroundColor: '#333',
    width: 350,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
});

export default SettingsView;