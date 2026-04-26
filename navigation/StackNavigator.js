import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddExerciseScreen from '../screens/AddExerciseScreen';
import CompletedScreen from '../screens/Completedscreen';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="Add Exercise" component={AddExerciseScreen} />
      <Stack.Screen name="Completed" component={CompletedScreen} />
      
    </Stack.Navigator>
  );
}