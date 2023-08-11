// *** NPM ***
import {createStackNavigator} from '@react-navigation/stack';

// *** OTHER ***
import PhotosList, {IPhoto} from './screens/PhotosList';
import Photo from './screens/Photo';

// *** PROPS ***
export type TRootStackProps = {
  PhotosList: undefined;
  Photo: {
    data: IPhoto;
  };
  ImageDetails: {
    image: string;
  };
};

const Stack = createStackNavigator<TRootStackProps>();

const RootNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="PhotosList">
      <Stack.Screen name="PhotosList" component={PhotosList}></Stack.Screen>
      <Stack.Screen name="Photo" component={Photo}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootNavigator;
