import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  View,
  Image,
  StyleSheet, 
  TouchableHighlight
} from 'react-native';

const Card = ({ imageUri, onImagePress }) => {
  return (
      <View>
        <TouchableHighlight style={styles.box} onPress={onImagePress}>
          <Image style={styles.image} source={{uri: imageUri}} />
        </TouchableHighlight>
      </View>
  );
}

Card.PropTypes = {
  imageUri: PropTypes.string.isRequired,
  onImagePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200
  }
});

export default Card;