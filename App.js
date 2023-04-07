import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import Home from './screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import { isAndroid } from "@freakycoder/react-native-helpers";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen 
              name="Basket" 
              component={BasketScreen} 
              options={{ 
                gestureEnabled: true,
                ...(isAndroid && TransitionPresets.ModalPresentationIOS),
                presentation: "modal", headerShown: false, 
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
        </Provider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

