// *** NPM ***
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// *** OTHER ***
import {TRootStackProps} from '../RootNavigation';
import Loading from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';

// *** PROPS ***
export interface IPhoto {
  description: string;
  id: number;
  title: string;
  url: string;
  user: number;
}

interface IProps {
  navigation: StackScreenProps<TRootStackProps, 'PhotosList'>['navigation'];
  route: StackScreenProps<TRootStackProps, 'PhotosList'>['route'];
}

interface IPhotoListItemProps {
  item: IPhoto;
  onPress: () => void;
}

// *** CONST ***
const URI = 'https://api.slingacademy.com/v1/sample-data/photos';

const PhotosList: React.FC<IProps> = ({navigation}) => {
  // *** USE STATE ***
  const [photos, setPhotos] = useState<IPhoto[] | null>(null);
  const [isSorted, setSort] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const PhotoListItem: React.FC<IPhotoListItemProps> = ({item, onPress}) => (
    <TouchableOpacity
      style={(styles.photoContainer, {width: isSorted ? '100%' : '50%'})}
      onPress={onPress}>
      <Image resizeMode="cover" style={styles.photo} source={{uri: item.url}} />
    </TouchableOpacity>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setSort(value => !value)}>
          <Text>GROUP</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // *** FETCH ***
  const fetchPhotos = async () => {
    try {
      setLoading(() => true);
      const response = await axios.get(URI);
      setPhotos(response.data.photos);
      await AsyncStorage.setItem(
        'cachedPhotos',
        JSON.stringify(response.data.photos),
      );
    } catch (error) {
      console.error('Error fetching photos data:', error);
      setError(true);
    } finally {
      setLoading(() => false);
    }
  };

  useEffect(() => {
    const fetchCachedPhotos = async () => {
      try {
        const cachedPhotos = await AsyncStorage.getItem('cachedPhotos');
        if (cachedPhotos) {
          setPhotos(JSON.parse(cachedPhotos));
        } else {
          fetchPhotos();
        }
      } catch (error) {
        console.log('Error fetching cached photos:', error);
      }
    };

    fetchCachedPhotos();
  }, []);

  if (loading === true) {
    return <Loading></Loading>;
  }

  if (error === true) {
    return (
      <ErrorComponent></ErrorComponent>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        numColumns={isSorted ? 1 : 2}
        key={isSorted ? 'one-column' : 'two-columns'}
        renderItem={({item}) => (
          <PhotoListItem
            item={item}
            onPress={() => navigation.navigate('Photo', {data: item})}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

// *** STYLES ***  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  loadingText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'green',
  },
  headerButton: {
    marginRight: 10,
  },
  photoContainer: {
    flexDirection: 'row',
  },
  photo: {
    height: 200,
    width: '100%',
  },
  errorText: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'red',
  },
});

export default PhotosList;
