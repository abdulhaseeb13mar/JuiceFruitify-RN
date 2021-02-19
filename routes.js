import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './UsResuables/RefNavigation';
import UsHome from './Main/UsHome';
import UsSingleProduct from './Main/UsSingleProduct';
// import PersonalInfoShiningLamp from './Main/PersonalInfoShiningLamp';
// import SearchShiningLamp from './Main/SearchShiningLamp';
// import OurFavourites from './Main/OurFavourites';
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
        {/* <Stack.Screen
          name="PersonalInfoShiningLamp"
          component={PersonalInfoShiningLamp}
        /> */}
        {/* <Stack.Screen name="SearchShiningLamp" component={SearchShiningLamp} /> */}
        {/* <Stack.Screen name="OurFavourites" component={OurFavourites} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
