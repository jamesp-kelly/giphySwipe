import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    this.handleCardSwiped = this.handleCardSwiped.bind(this);

    this.loadGifs();
  }

  static navigationOptions = {
    title: 'giphySwipe',
  };

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

  handleCardSwiped(direction) {
    this.setState({
      gifs: this.state.gifs.slice(1)
    });
  }
  
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.navButtons}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Settings')}>
            <Icon style={styles.settings} name="gear" size={40} />
          </TouchableHighlight>
        </View>
        <View style={styles.swipeContainer}>
          {
            this.state.isLoading ?
             <ActivityIndicator color='#fff' size='large' />
            :
            this.state.gifs.map((gif, index) => {
              return <Card
                key={gif.id}
                stackIndex={index}
                imageUri={gif.images.original.url}
                onImagePress={() => {}}
                onSwiped={this.handleCardSwiped}
              />
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  swipeContainer: {
    height: '90%',
    backgroundColor: 'yellow',
    alignItems: 'center',
    paddingTop: 50,
  },
  navButtons: {
    height: '10%',
    backgroundColor: 'blue',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  settings: {
    marginTop: 10,
    marginRight: 10,
    color: '#fff'
  }
});

export default SwipeView;