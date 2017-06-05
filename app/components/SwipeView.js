import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ActivityIndicator
} from 'react-native';
import api from '../utils/api';
import Card from './Card';

class SwipeView extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      isLoading: true,
      error: false,
      gifs: []
    };

    this.loadGifs();
  }

  loadGifs() {
    api.getGifs()
      .then((res) => {
        this.setState({
          gifs: res.data,
          isLoading: false
        })
      }).catch((err) => {

      })
  }
  
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          {
            this.state.isLoading ?
             <ActivityIndicator color='#fff' size='large' />
            :
            <Card 
              imageUri={this.state.gifs[3].images.original.url} 
              onImagePress={() => {}}
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

export default SwipeView;