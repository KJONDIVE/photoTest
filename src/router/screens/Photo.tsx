// *** NPM ***
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';

// *** OTHER ***
import ImageZoomModal from '../components/ImageZoomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import {TRootStackProps} from '../RootNavigation';

// *** PROPS ***
interface IProps {
  navigation: StackScreenProps<TRootStackProps, 'Photo'>['navigation'];
  route: StackScreenProps<TRootStackProps, 'Photo'>['route'];
}

interface IUser {
  city: string;
  country: string;
  date_of_birth: string;
  email: string;
  first_name: string;
  gender: string;
  id: number;
  job: string;
  last_name: string;
  latitude: number;
  longitude: number;
  phone: string;
  state: string;
  street: string;
  zipcode: string;
}

const Photo: React.FC<IProps> = props => {
  // *** PROPS ***
  const {route} = props;
  const data = route.params.data;

  // *** USE STATE ***
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userError, setUserError] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  // *** FETCH ***
  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const response = await axios.get(
        `https://api.slingacademy.com/v1/sample-data/users/${data.user}`,
      );
      setUserData(response.data.user);
      await AsyncStorage.setItem(
        `cachedUser${data.user}`,
        JSON.stringify(response.data.user),
      );
    } catch (error) {
      setUserError(true);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    const fetchCachedUser = async () => {
      try {
        const cachedUser = await AsyncStorage.getItem(`cachedUser${data.user}`);
        if (cachedUser) {
          setUserData(JSON.parse(cachedUser));
        } else {
          fetchUser();
        }
      } catch (error) {
        console.log('Error fetching cached user:', error);
      }
    };

    fetchCachedUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image style={styles.image} source={{uri: data.url}} />
      </TouchableOpacity>

      <Text style={styles.title}>{data.title}</Text>

      {userLoading === true ? (
        <LoadingComponent />
      ) : userError ? (
        <ErrorComponent />
      ) : (
        <View style={styles.userDataContainer}>
          <View style={styles.userRow}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.userImage}
                source={require('../../../image/logo.png')}
              />
              <Text style={styles.userName}>{userData?.last_name}</Text>
              <Text style={styles.userName}>{userData?.first_name}</Text>
            </View>
            <Text style={styles.userGender}>{userData?.gender}</Text>
          </View>

          <Text style={styles.userDetails}>
            From: {userData?.city}, {userData?.country}
          </Text>
          <Text style={styles.userDetails}>E-mail: {userData?.email}</Text>
          <Text style={styles.userDetails}>Phone: {userData?.phone}</Text>
        </View>
      )}
      <Text style={styles.description}>{data.description}</Text>
      <ImageZoomModal
        isVisible={isModalVisible}
        imageUrl={data.url}
        onClose={setModalVisible}
      />
    </ScrollView>
  );
};

// *** STYLES ***
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    height: 200,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  userDataContainer: {
    marginBottom: 30,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: 'grey',
  },
  userName: {
    marginHorizontal: 10,
    fontSize: 17,
    color: 'black',
  },
  userGender: {
    fontSize: 13,
    color: 'black',
  },
  userDetails: {
    fontSize: 17,
    color: 'black',
  },
  description: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
  },
});

export default Photo;
