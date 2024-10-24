// Gallery.js
import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const Gallery = () => {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need media library permissions to make this work!');
      }
    };

    requestPermission();
  }, []);

  return (
    <View>
      <Text>Gallery Component</Text>
      <video src=""></video>
    </View>
  );
};

export default Gallery;
