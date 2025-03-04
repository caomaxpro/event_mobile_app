import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppNavigation} from '@src/hooks/userAppNavigation';
import ScreenComponent from '@src/components/ScreenComponent';

const HomeScreen = () => {
  const {drawerNavigation} = useAppNavigation();

  useEffect(() => {
    console.log('Rendering !!!');
  });

  return (
    <ScreenComponent contentStyle={styles.container}>
      {/* Header */}
      <View style={[styles.header, {marginTop: StatusBar.currentHeight || 0}]}>
        <TouchableOpacity
          onPress={() => {
            drawerNavigation.openDrawer();
          }}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>

        <View style={styles.location}>
          <Text style={styles.locationText}>Current Location</Text>
          <Text style={styles.locationTitle}>New York, USA</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" style={styles.icon} />
        <TextInput placeholder="Search..." style={styles.input} />
        <TouchableOpacity>
          <Ionicons name="options-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity
          style={[styles.categoryButton, {backgroundColor: '#ff4d4d'}]}>
          <Text style={styles.categoryText}>Sports</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, {backgroundColor: '#ffaa00'}]}>
          <Text style={styles.categoryText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.categoryButton, {backgroundColor: '#33cc33'}]}>
          <Text style={styles.categoryText}>Food</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        <View style={styles.eventCard}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.eventImage}
          />
          <Text style={styles.eventTitle}>International Band Music</Text>
          <Text style={styles.eventLocation}>36 Guild Street London, UK</Text>
        </View>
      </ScrollView>
    </ScreenComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  location: {
    alignItems: 'center',
  },
  locationText: {
    color: '#666',
    fontSize: 12,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  eventLocation: {
    color: '#666',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 30,
  },
});
