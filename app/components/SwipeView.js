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
import { GIF_QUEUE_SIZE, REFILL_QUEUE_THRESHOLD, REFILL_POOL_THRESHOLD } from '../utils/constants';

class SwipeView extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      displaySpinner: true,
      error: false,
      gifQueue: [],
      gifPool: [],
      apiOffset: 0
    };

    this.handleCardSwiped = this.handleCardSwiped.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);

    this.fillGifPool();
  }

  static navigationOptions = {
    title: 'giphySwipe',
  };

  fillGifQueue() {
    this.setState((state, props) => {

      const currentQueueCount = state.gifQueue.length; 
      const pulledFromPool = state.gifPool.slice(0, GIF_QUEUE_SIZE - currentQueueCount);
      const remainder = state.gifPool.slice(GIF_QUEUE_SIZE - currentQueueCount);
      
      return {
        gifPool: remainder,
        gifQueue: [
          ...state.gifQueue,
          ...pulledFromPool.map(gif => {
            return {
              ...gif,
              loaded: false
            };
          })
        ]
      };
    });
  }

  fillGifPool() {
    api.getGifs('funny cat', this.state.apiOffset)
      .then((res) => {
        this.setState((state, props) => {
          return {
            gifPool: res.data,
            apiOffset: state.apiOffset + res.data.length
          };
        }, () => {
          if (this.state.gifQueue.length < REFILL_QUEUE_THRESHOLD) {
            this.fillGifQueue();
          }
        });
      
    
  

      }).catch((err) => {
        console.error('Error getting gifs',err);
      })
  }

  handleCardSwiped(direction) {
    this.setState((state, ownProps) => {
      console.log(`There are ${state.gifQueue.length - 1} gifs left in the queue`);
      
      return {
        gifQueue: state.gifQueue.slice(1)
      }
    }, () => {
      if (this.state.gifPool.length < REFILL_POOL_THRESHOLD) {
        this.fillGifPool();
      } else if (this.state.gifQueue.length < REFILL_QUEUE_THRESHOLD) {
        this.fillGifQueue();
      }
    });
  }

  handleImageLoaded(id) {
    
    const updatedgifQueue = this.state.gifQueue.map(gif => {
      if (gif.id !== id) return gif;
      return {
        ...gif,
        loaded: true
      };
    });

    const displaySpinner = updatedgifQueue.some(gif => !gif.loaded);

    this.setState({
      gifQueue: updatedgifQueue,
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
            this.state.gifQueue.map((gif, index) => {
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