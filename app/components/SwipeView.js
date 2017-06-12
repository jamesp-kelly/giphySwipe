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
      displaySpinner: true,
      error: false,
      gifsToSwipe: []
    };

    this.handleCardSwiped = this.handleCardSwiped.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);

    this.loadGifs();
  }

  static navigationOptions = {
    title: 'giphySwipe',
  };

  loadGifs() {
    api.getGifs()
      .then((res) => {
        this.setState({
          gifsToSwipe: res.data.map(gif => {
            return {
              ...gif,
              loaded: false
            };
          }),
          displaySpinner: false
        })
      }).catch((err) => {
        console.error('Error getting gifs',err);
      })
  }

  handleCardSwiped(direction) {
    this.setState({
      gifsToSwipe: this.state.gifsToSwipe.slice(1)
    });
  }

  handleImageLoaded(id) {
    
    const updatedGifsToSwipe = this.state.gifsToSwipe.map(gif => {
      if (gif.id !== id) return gif;
      return {
        ...gif,
        loaded: true
      };
    });

    const displaySpinner = updatedGifsToSwipe.some(gif => !gif.loaded);

    this.setState({
      gifsToSwipe: updatedGifsToSwipe,
      displaySpinner: displaySpinner
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
            this.state.gifsToSwipe.map((gif, index) => {
              return <Card
                key={gif.id}
                stackIndex={index}
                imageUri={gif.images.original.url}
                imageId={gif.id}
                onImagePress={() => {}}
                onImageLoaded={this.handleImageLoaded}
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