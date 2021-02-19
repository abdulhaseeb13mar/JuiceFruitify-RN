import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './UsResuables/RefNavigation';
import UsHome from './Main/UsHome';
import UsSingleProduct from './Main/UsSingleProduct';
import UsCart from './Main/UsCart';
import InfoScreen from './Main/InfoScreen';
import SearchJuiceFruitify from './Main/SearchJuiceFruitify';
import UsFavourites from './Main/UsFavourites';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="UsHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="UsHome" component={UsHome} />
        <Stack.Screen name="UsSingleProduct" component={UsSingleProduct} />
        <Stack.Screen name="UsCart" component={UsCart} />
        <Stack.Screen
          name="SearchJuiceFruitify"
          component={SearchJuiceFruitify}
        />
        <Stack.Screen name="UsFavourites" component={UsFavourites} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
