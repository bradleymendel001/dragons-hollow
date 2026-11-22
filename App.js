import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NameEntryScreen from './screens/NameEntryScreen';
import HomeScreen from './screens/HomeScreen';
import CharacterSelectScreen from './screens/CharacterSelectScreen';
import StatAllocationScreen from './screens/StatAllocationScreen';
import GameScreen from './screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Dragon's Hollow" }} />
        <Stack.Screen name="CharacterSelect" component={CharacterSelectScreen} options={{ title: 'Choose Hero' }} />
        <Stack.Screen name="NameEntry" component={NameEntryScreen}/>
        <Stack.Screen name="StatAllocation" component={StatAllocationScreen} options={{ title: 'Assign Stats' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Battle' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
