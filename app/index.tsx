// // import React from 'react';
// // import MapView from 'react-native-maps';
// // import { StyleSheet, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <MapView style={styles.map} />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// //   map: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });
// import React, { useEffect, useState } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, View, Alert } from 'react-native';

// import * as Location from 'expo-location'; // Expo کی لوکیشن لائبریری شامل کریں

// export default function App() {
//   const [region, setRegion] = useState({
//     latitude: 37.78825, // Default Latitude
//     longitude: -122.4324, // Default Longitude
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   useEffect(() => {
//     const requestPermission = async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Sorry, we need location permissions to make this work!');
//         return;
//       }

//       const userLocation = await Location.getCurrentPositionAsync({});
//       setRegion({
//         ...region,
//         latitude: userLocation.coords.latitude,
//         longitude: userLocation.coords.longitude,
//       });
//     };

//     requestPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         region={region}
//         showsUserLocation={true} // User's location کو دکھائیں
//       >
//         {/* User's location پر ایک Marker شامل کریں */}
//         <Marker coordinate={region} title="You are here!" />
//       </MapView>
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
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';

interface Item {
    name: string;
    id: number
}

const index = () => {

    const [users, setUsers] = useState<null | []>(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                setUsers(json)
            })
            .catch((error) => {
              console.log(error);
              setError(true);
          })
    }, [])
    return (
        <ScrollView>
            <Text>index</Text>
            {loading && <Text>Loading...</Text>}

            {error && <Text>Error occured</Text>}

            {users && users.map((item: Item)=>{
                return <View style={styles.item} key={item.id}>
                    <Text >{item.name}</Text>
                </View>
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 0,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default index