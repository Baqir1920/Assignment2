import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import Home from './src/screens/Home';
import ShoppingCart from './src/screens/ShoppingCart';
import ProductDetails from './src/screens/ProductDetails';
import ProductsByCategory from './src/screens/ProductsByCategory';
import UserProfile from './src/screens/UserProfile';
import MyOrders from './src/screens/MyOrders';
import MyTabBar from './src/screens/MyTabBar';
import store from './src/store/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategory} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="UserProfile"
          tabBar={(props) => <MyTabBar {...props} />}
        >
          <Tab.Screen name="Products" component={ProductsStack} />
          <Tab.Screen name="ShoppingCart" component={ShoppingCart} />
          <Tab.Screen name="MyOrders" component={MyOrders} />
          <Tab.Screen name="UserProfile" component={UserProfile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
