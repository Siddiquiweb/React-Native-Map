// import React from 'react';
// import MapView from 'react-native-maps';
// import { StyleSheet, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert } from 'react-native';
import * as Location from 'expo-location'; // Expo کی لوکیشن لائبریری شامل کریں

export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Default Latitude
    longitude: -122.4324, // Default Longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need location permissions to make this work!');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    };

    requestPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true} // User's location کو دکھائیں
      >
        {/* User's location پر ایک Marker شامل کریں */}
        <Marker coordinate={region} title="You are here!" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
