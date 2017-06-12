import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  View,
  Image,
  StyleSheet, 
  TouchableHighlight,
  Animated,
  PanResponder
} from 'react-native';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      flingRotateAngle: '45deg'
    };
  }

  componentWillMount() {
    this.positionAnimatedValue = new Animated.ValueXY();
    this.rotationAnimatedValue = new Animated.Value(0);

    this._value = {x: 0, y: 0};
    this.positionAnimatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.positionAnimatedValue.setOffset({
          x: this._value.x,
          y: this._value.y
        });
        this.positionAnimatedValue.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null, { dx: this.positionAnimatedValue.x, dy: this.positionAnimatedValue.y }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        this.positionAnimatedValue.flattenOffset();

        if (gestureState.dx > 150) {
          this.flingCardRight();
        } else if (gestureState.dx < -150) {
          this.flingCardLeft();
        } else {
          this.returnCardToCenter();
        }
      }
    })
  }

  flingCardLeft() {
    this.setState({
      flingRotateAngle: '-45deg'
    });

    Animated.parallel([
      Animated.timing(this.positionAnimatedValue.x, {
        toValue: -500,
        duration: 400
      }),
      Animated.timing(this.rotationAnimatedValue, {
        toValue: 1,
        duration: 400
      })
    ]).start();

    this.props.onSwiped('left', 0);
  }

  flingCardRight() {
    this.setState({
      flingRotateAngle: '45deg'
    });

    Animated.parallel([
      Animated.timing(this.positionAnimatedValue.x, {
        toValue: 500,
        duration: 400
      }),
      Animated.timing(this.rotationAnimatedValue, {
        toValue: 1,
        duration: 400
      })
    ]).start();

    this.props.onSwiped('right', 0);
  }

  returnCardToCenter() {
    Animated.spring(this.positionAnimatedValue, {
      toValue: 0,
      duraction: 600
    }).start();
  }

  render() {
    const animatedStyle = {
      transform: this.positionAnimatedValue.getTranslateTransform()
    };

    const interpolateRotation = this.rotationAnimatedValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', this.state.flingRotateAngle]
    });
    
    animatedStyle.transform = [
      ...animatedStyle.transform,
      {rotate: interpolateRotation}
    ];

    const { imageUri, imageId, onImagePress, onImageLoaded, stackIndex } = this.props;
    const panHandlers = (stackIndex === 0) ? this.panResponder.panHandlers : {};
    const stackIndexStyle = {
      zIndex: 1000 - stackIndex
    };

    return (
      <Animated.View style={[styles.card, animatedStyle, stackIndexStyle]} {...panHandlers}>
        <TouchableHighlight style={styles.box} onPress={onImagePress}>
          <Image 
            style={styles.image} 
            source={{uri: imageUri}}
            onLoadEnd={() => onImageLoaded(imageId)}  
          />
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

Card.PropTypes = {
  imageUri: PropTypes.string.isRequired,
  onImagePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  },
  card: {
    backgroundColor: '#333',
    width: 350,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -350
  }
});

export default Card;